/**
 * @file AttackRules.cpp
 * @brief Source file for creation of Rules Attack
 * @authors Lukas Zobal (zobal.lukas(at)gmail.com)
 * @date 12. 12. 2018
 * @license MIT, see LICENSE
 */

#include <AttackRules.h>

#include <cmath>    /**< std::round */


CAttackRules::CAttackRules(PtrPackage & package, PtrHost & host, uint64_t seconds, CSqlLoader * sqlLoader)
    :   AttackMode(package, host, seconds, sqlLoader)
{

}


bool CAttackRules::makeWorkunit() {
    /** Create the workunit first */
    if (!m_workunit && !generateWorkunit())
        return false;

    DB_WORKUNIT wu;
    char name1[Config::SQL_BUF_SIZE], name2[Config::SQL_BUF_SIZE], name3[Config::SQL_BUF_SIZE],
            name4[Config::SQL_BUF_SIZE], path[Config::SQL_BUF_SIZE];

    const char *infiles[4];
    int retval;

    /** Make a unique name for the workunit and its input file */
    std::snprintf(name1, Config::SQL_BUF_SIZE, "%s_%d_%d", Config::appName, Config::startTime, Config::seqNo++);
    std::snprintf(name2, Config::SQL_BUF_SIZE, "%s_%d_%d", Config::appName, Config::startTime, Config::seqNo++);
    std::snprintf(name3, Config::SQL_BUF_SIZE, "%s_%d_%d.dict", Config::appName, Config::startTime, Config::seqNo++);
    /** Same name of rules file - for sticky flag to work */
    std::snprintf(name4, Config::SQL_BUF_SIZE, "%s_rules_%" PRIu64 "", Config::appName, m_package->getId());

    /** Append mode to config */
    retval = config.download_path(name1, path);
    if (retval)
    {
        Tools::printDebugHost(Config::DebugType::Error, m_package->getId(), m_host->getBoincHostId(),
                "Failed to receive BOINC filename - config. Setting package to malformed.\n");
        m_sqlLoader->updateRunningPackageStatus(m_package->getId(), Config::PackageState::PackageMalformed);
        return false;
    }

    std::ofstream f;
    f.open(path);
    if (!f)
    {
        Tools::printDebugHost(Config::DebugType::Error, m_package->getId(), m_host->getBoincHostId(),
                "Failed to open config BOINC input file! Setting package to malformed.\n");
        m_sqlLoader->updateRunningPackageStatus(m_package->getId(), Config::PackageState::PackageMalformed);
        return false;
    }

    Tools::printDebug("CONFIG for new workunit:\n");

    /** Output original config from DB */
    f << m_package->getConfig();
    Tools::printDebug(m_package->getConfig().c_str());

    /** Output mode */
    f << "|||mode|String|1|n|||\n";
    Tools::printDebug("|||mode|String|1|n|||\n");

    f.close();

    /** Load current workunit dictionary */
    PtrDictionary workunitDict = m_sqlLoader->loadDictionary(m_workunit->getDictionaryId());

    /** Debug */
    Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
            "In first dict, there are %" PRIu64 " passwords\n", workunitDict->getHcKeyspace());
    Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
            "In rule file, there are %" PRIu64 " rules\n", m_package->getCombSecDictSize());
    Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
            "Workunit can compute %" PRIu64 " passwords\n", m_workunit->getHcKeyspace());


    /** Create dict1 file */
    retval = config.download_path(name3, path);
    if (retval)
    {
        Tools::printDebugHost(Config::DebugType::Error, m_package->getId(), m_host->getBoincHostId(),
                "Failed to receive BOINC filename - dict1. Setting package to malformed.\n");
        m_sqlLoader->updateRunningPackageStatus(m_package->getId(), Config::PackageState::PackageMalformed);
        return false;
    }

    f.open(path);
    if (!f)
    {
        Tools::printDebugHost(Config::DebugType::Error, m_package->getId(), m_host->getBoincHostId(),
                "Failed to open dict1 BOINC input file! Setting package to malformed.\n");
        m_sqlLoader->updateRunningPackageStatus(m_package->getId(), Config::PackageState::PackageMalformed);
        return false;
    }

    std::ifstream dictFile;
    dictFile.open((Config::dictDir + workunitDict->getDictFileName()).c_str());
    if (!dictFile)
    {
        Tools::printDebugHost(Config::DebugType::Error, m_package->getId(), m_host->getBoincHostId(),
                "Cannot find dictionary file! Setting package to malformed.\n");
        m_sqlLoader->updateRunningPackageStatus(m_package->getId(), Config::PackageState::PackageMalformed);
        return false;
    }

    uint64_t dictKeyspace = (uint64_t)(std::round(m_workunit->getHcKeyspace() / (float)(m_package->getCombSecDictSize())));

    /** Always send at least one password */
    if (dictKeyspace < 1)
        dictKeyspace = 1;

    uint64_t newCurrentIndex = m_workunit->getStartIndex() + dictKeyspace;
    if (!m_workunit->isDuplicated())
        Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
                "New dictionary current index: %" PRIu64 "\n", newCurrentIndex);

    /** Check if we reached end of keyspace */
    if (newCurrentIndex >= workunitDict->getHcKeyspace())
    {
        Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
                "We reached the end of current dictionary, modifiyng workunit keyspace\n");

        dictKeyspace = workunitDict->getHcKeyspace() - m_workunit->getStartIndex();
        newCurrentIndex = workunitDict->getHcKeyspace();
    }

    Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
            "The #passwords from dict is therefore: %" PRIu64 "\n", dictKeyspace);

    if (!m_workunit->isDuplicated())
    {
        workunitDict->updateIndex(newCurrentIndex);
        m_package->updateIndex(m_package->getCurrentIndex() + dictKeyspace);
    }

    m_workunit->setHcKeyspace(dictKeyspace);

    /** Computation done, start creating dictionary */
    /** Ignore 'start_index' passwords */
    uint64_t workunitStartIndex = m_workunit->getStartIndex();
    Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
            "Skipping %" PRIu64 " passwords\n", workunitStartIndex);

    std::string passwd;
    uint64_t currentIndex;
    for (currentIndex = 0; currentIndex < workunitStartIndex; ++currentIndex)
        std::getline(dictFile, passwd);

    /** No more passwords in current dictionary */
    if (dictFile.eof())
    {
        Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
                "'start_index' parameter is too far away\n");
        workunitDict->updateIndex(workunitDict->getHcKeyspace());
        m_package->updateIndex(m_package->getCurrentIndex() - dictKeyspace);
        return true;
    }

    Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
            "Adding %" PRIu64 " passwords to host dict file\n", dictKeyspace);

    /** Add 'keyspace' passwords to dict2 file */
    for (currentIndex = 0; currentIndex < dictKeyspace; ++currentIndex)
    {
        std::getline(dictFile, passwd);
        if (!passwd.empty())
            f << passwd << '\n';

        /** End of current dictionary */
        if (dictFile.eof())
        {
            Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
                    "Ate all passwords from current dictionary\n");
            m_workunit->setHcKeyspace(currentIndex);

            if (!m_workunit->isDuplicated())
            {
                workunitDict->updateIndex(workunitDict->getHcKeyspace());
                m_package->updateIndex(m_package->getCurrentIndex() - dictKeyspace + currentIndex);
            }

            break;
        }
    }

    Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
            "Done. Closing files\n");

    dictFile.close();
    f.close();


    /** Create data file */
    retval = config.download_path(name2, path);
    if (retval)
    {
        Tools::printDebugHost(Config::DebugType::Error, m_package->getId(), m_host->getBoincHostId(),
                "Failed to receive BOINC filename - data. Setting package to malformed.\n");
        m_sqlLoader->updateRunningPackageStatus(m_package->getId(), Config::PackageState::PackageMalformed);
        return false;
    }

    f.open(path);
    if (!f)
    {
        Tools::printDebugHost(Config::DebugType::Error, m_package->getId(), m_host->getBoincHostId(),
                "Failed to open data BOINC input file! Setting package to malformed.\n");
        m_sqlLoader->updateRunningPackageStatus(m_package->getId(), Config::PackageState::PackageMalformed);
        return false;
    }

    f << m_package->getHashes();
    f.close();


    /** Create rules file */
    retval = config.download_path(name4, path);
    if (retval)
    {
        Tools::printDebugHost(Config::DebugType::Error, m_package->getId(), m_host->getBoincHostId(),
                "Failed to receive BOINC filename - rules. Setting package to malformed.\n");
        m_sqlLoader->updateRunningPackageStatus(m_package->getId(), Config::PackageState::PackageMalformed);
        return false;
    }

    f.open(path);
    if (!f)
    {
        Tools::printDebugHost(Config::DebugType::Error, m_package->getId(), m_host->getBoincHostId(),
                "Failed to open rules BOINC input file! Setting package to malformed.\n");
        m_sqlLoader->updateRunningPackageStatus(m_package->getId(), Config::PackageState::PackageMalformed);
        return false;
    }

    if(m_package->getRules().empty())
    {
        Tools::printDebugHost(Config::DebugType::Error, m_package->getId(), m_host->getBoincHostId(),
                "Rules is not set in database! Setting package to malformed.\n");
        m_sqlLoader->updateRunningPackageStatus(m_package->getId(), Config::PackageState::PackageMalformed);
        return false;
    }

    std::ifstream rulesFile;
    rulesFile.open((Config::rulesDir + m_package->getRules()).c_str());
    if (!rulesFile)
    {
        Tools::printDebugHost(Config::DebugType::Error, m_package->getId(), m_host->getBoincHostId(),
                "Failed to open rules file! Setting package to malformed.\n");
        m_sqlLoader->updateRunningPackageStatus(m_package->getId(), Config::PackageState::PackageMalformed);
        return false;
    }

    f << rulesFile.rdbuf();
    f.close();


    /** Fill in the workunit parameters */
    wu.clear();
    wu.appid = Config::app->id;
    safe_strcpy(wu.name, name1);
    wu.delay_bound = m_package->getTimeoutFactor() * (uint32_t)(m_package->getSecondsPerWorkunit());
    infiles[0] = name1;
    infiles[1] = name2;
    infiles[2] = name3;
    infiles[3] = name4;

    setDefaultWorkunitParams(&wu);

    /** Register the workunit with BOINC */
    std::snprintf(path, Config::SQL_BUF_SIZE, "templates/%s", Config::outTemplateFile.c_str());
    retval = create_work(
            wu,
            Config::inTemplatePathRule,
            path,
            config.project_path(path),
            infiles,
            4,
            config
    );

    if (retval)
    {
        Tools::printDebugHost(Config::DebugType::Error, m_package->getId(), m_host->getBoincHostId(),
                "Failed to create BOINC workunit. Setting package to malformed.\n");
        m_sqlLoader->updateRunningPackageStatus(m_package->getId(), Config::PackageState::PackageMalformed);
        return false;
    }

    restrict_wu_to_host(wu, m_workunit->getBoincHostId());

    m_workunit->setWorkunitId(uint64_t(wu.id));
    m_sqlLoader->addNewWorkunit(m_workunit);

    Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
                          "Workunit succesfully created\n");
    return true;
}


bool CAttackRules::generateWorkunit()
{
    Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
            "Generating rules workunit ...\n");

    /** Compute password count */
    uint64_t passCount = m_host->getPower() * m_seconds;

    if (passCount < Config::minPassCount)
    {
        Tools::printDebugHost(Config::DebugType::Warn, m_package->getId(), m_host->getBoincHostId(),
                "Passcount is too small! Falling back to minimum passwords\n");
        passCount = Config::minPassCount;
    }

    /** Load package dictionaries */
    std::vector<PtrDictionary> dictVec = m_package->getDictionaries();
    Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
            "Dictionaries left for this package: %" PRIu64 "\n", dictVec.size());

    /** Find the following dictionary */
    PtrDictionary currentDict;
    for (PtrDictionary & dict : dictVec)
    {
        if (dict->getCurrentIndex() < dict->getHcKeyspace())
        {
            /** Dictionary for a new workunit found */
            Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
                    "Dict found: %s, current index: %" PRIu64 "/%" PRIu64 "\n",
                    dict->getDictFileName().c_str(), dict->getCurrentIndex(), dict->getHcKeyspace());
            currentDict = dict;
            break;
        }
    }

    if (!currentDict)
    {
        /** No dictionaries found, no workunit could be generated */
        Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
                "No dictionaries found for this package\n");
        return false;
    }

    /**
     * Create the workunit
     * @warning We save number of real passwords to hc_keyspace and modify it later
     */
    m_workunit = CWorkunit::create(m_package->getId(), m_host->getId(), m_host->getBoincHostId(), currentDict->getCurrentIndex(),
                         0, passCount, 0, currentDict->getId(), false, 0, false);
    /**
     * @warning Index updating (current_index) must be done later
     */
    return true;
}
