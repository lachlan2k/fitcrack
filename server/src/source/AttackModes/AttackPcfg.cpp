/**
 * @file AttackPcfg.cpp
 * @brief Source file for creation of Pcfg Attack
 * @authors Lukas Zobal (zobal.lukas(at)gmail.com)
 * @date 10. 7. 2019
 * @license MIT, see LICENSE
 */

#include <AttackPcfg.h>
#include <AttackPcfgClient.h>


CAttackPcfg::CAttackPcfg(PtrPackage & package, PtrHost & host, uint64_t seconds, CSqlLoader * sqlLoader)
        :   AttackMode(package, host, seconds, sqlLoader)
{
    m_client = PretermClient(package->getId());
}


bool CAttackPcfg::makeWorkunit()
{
    /** Create the workunit instance first */
    if (!m_workunit && !generateWorkunit())
        return false;

    DB_WORKUNIT wu;
    char name1[Config::SQL_BUF_SIZE],name2[Config::SQL_BUF_SIZE],name3[Config::SQL_BUF_SIZE],name4[Config::SQL_BUF_SIZE],path[Config::SQL_BUF_SIZE];
    const char* infiles[4];
    int retval;

    /** Make a unique name for the workunit and its input file */
    std::snprintf(name1, Config::SQL_BUF_SIZE, "%s_%d_%d", Config::appName, Config::startTime, Config::seqNo++);
    std::snprintf(name2, Config::SQL_BUF_SIZE, "%s_%d_%d", Config::appName, Config::startTime, Config::seqNo++);
    std::snprintf(name3, Config::SQL_BUF_SIZE, "%s_%d_%d.dict", Config::appName, Config::startTime, Config::seqNo++);
    std::snprintf(name4, Config::SQL_BUF_SIZE, "%s_grammar_%" PRIu64 "", Config::appName, m_package->getId());


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

    /** Create preterminals file. */
    retval = config.download_path(name3, path);
    if (retval)
    {
        Tools::printDebugHost(Config::DebugType::Error, m_package->getId(), m_host->getBoincHostId(),
                              "Failed to receive BOINC filename - dict1. Setting package to malformed.\n");
        m_sqlLoader->updateRunningPackageStatus(m_package->getId(), Config::PackageState::PackageMalformed);
        return false;
    }

    std::ofstream outfile(path, std::ofstream::binary);
    if (!outfile)
    {
        Tools::printDebugHost(Config::DebugType::Error, m_package->getId(), m_host->getBoincHostId(),
                              "Failed to open dict1 BOINC input file! Setting package to malformed.\n");
        m_sqlLoader->updateRunningPackageStatus(m_package->getId(), Config::PackageState::PackageMalformed);
        return false;
    }

    Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
                          "Asking for preterminals fragment ...\n");

    /** gRPC call to collect preterminals and update current index + keyspace */
    std::string preterminals;
    uint64_t newKeyspace = m_workunit->getHcKeyspace();

    /** @workaround Limit keyspace because of client memory problems */
    if (newKeyspace > Config::MAX_PCFG_KEYSPACE)
        newKeyspace = Config::MAX_PCFG_KEYSPACE;

    loadNextPreterminals(preterminals, newKeyspace);

    if (preterminals.empty() || newKeyspace == 0)
    {
        Tools::printDebugHost(Config::DebugType::Error, m_package->getId(), m_host->getBoincHostId(),
                              "Failed to fetch response from PCFG Manager!\n");
        return true;
    }

    outfile.write(preterminals.c_str(), sizeof(char) * preterminals.size());
    outfile.close();

    /** Create grammar sticky file. */
    retval = config.download_path(name4, path);
    if (retval)
    {
        Tools::printDebugHost(Config::DebugType::Error, m_package->getId(), m_host->getBoincHostId(),
                              "Failed to receive BOINC filename - grammar. Skipping workunit.\n");
        return true;
    }

    f.open(path);
    if (!f)
    {
        Tools::printDebugHost(Config::DebugType::Error, m_package->getId(), m_host->getBoincHostId(),
                              "Failed to open grammar BOINC input file! Skipping workunit.\n");
        return true;
    }

    Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
                          "Creating grammar file %s\n", (Config::pcfgDir + m_package->getGrammar() + "/grammar.bin").c_str());


    /** Load grammar path from DB and dump it to BOINC input file  */
    std::ifstream grammarFile;
    grammarFile.open((Config::pcfgDir + m_package->getGrammar() + "/grammar.bin").c_str());
    if (!grammarFile) {
        Tools::printDebugHost(Config::DebugType::Error, m_package->getId(), m_host->getBoincHostId(),
                              "Failed to open grammar file! Setting package to malformed.\n");
        m_sqlLoader->updateRunningPackageStatus(m_package->getId(), Config::PackageState::PackageMalformed);
        return false;
    }

    f << grammarFile.rdbuf();
    grammarFile.close();
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
            Config::inTemplatePathPcfg,
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

    /** Update keyspaces */
    m_package->updateIndex(m_package->getCurrentIndex() + newKeyspace);
    m_workunit->setWorkunitId(uint64_t(wu.id));
    m_workunit->setHcKeyspace(newKeyspace);
    m_sqlLoader->addNewWorkunit(m_workunit);

    Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
                          "Workunit succesfully created\n");

    /** Check if we reached end of PCFG keyspace */
    if (m_package->getCurrentIndex() >= m_package->getKeyspace())
    {
        Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
                              "Reached end of keyspace. Setting package to finishing!\n");
        m_sqlLoader->updateRunningPackageStatus(m_package->getId(), Config::PackageState::PackageFinishing);
        m_client.Disconnect();
        m_client.Kill();
    }

    return true;
}


bool CAttackPcfg::generateWorkunit()
{
    Tools::printDebugHost(Config::DebugType::Log, m_package->getId(), m_host->getBoincHostId(),
                          "Generating PCFG workunit ...\n");

    /** Compute password count */
    uint64_t passCount = m_host->getPower() * m_seconds;

    if (passCount < Config::minPassCount)
    {
        Tools::printDebugHost(Config::DebugType::Warn, m_package->getId(), m_host->getBoincHostId(),
                              "Passcount is too small! Falling back to minimum passwords\n");
        passCount = Config::minPassCount;
    }

    if (passCount + m_package->getCurrentIndex() > m_package->getHcKeyspace())
        passCount = m_package->getHcKeyspace() - m_package->getCurrentIndex();

    /** Create the workunit */
    m_workunit = CWorkunit::create(m_package->getId(), m_host->getId(), m_host->getBoincHostId(), m_package->getCurrentIndex(), 0, passCount, 0, 0,
                         false, 0, false);

    /**
     * @warning Index and WU-Keyspace updating must be done later, after the response from PCFG Manager
     */

    return true;
}


void CAttackPcfg::loadNextPreterminals(std::string & preterminals, uint64_t & realKeyspace)
{
    /** Run gRPC query to get preterminals */
    if (!m_client.Connect())
        return;

    preterminals = m_client.GetNextItems(realKeyspace);
    m_client.Acknowledge();
}
