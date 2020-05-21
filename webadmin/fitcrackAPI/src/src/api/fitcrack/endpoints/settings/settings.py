'''
   * Author : see AUTHORS
   * Licence: MIT, see LICENSE
'''

import logging

from flask import request
from flask_restplus import Resource, abort
from sqlalchemy import exc

from src.api.apiConfig import api
from src.api.fitcrack.endpoints.settings.argumentsParser import settings_arguments
from src.api.fitcrack.endpoints.settings.responseModels import settings_model
from src.api.fitcrack.responseModels import simpleResponse
from src.database import db
from src.database.models import FcSetting

log = logging.getLogger(__name__)
ns = api.namespace('settings', description='Endpoints for manipulating system settings.')

@ns.route('')
class settings(Resource):

    @api.marshal_with(settings_model)
    def get(self):
        """
        Returns all system settings.
        """
        settings = FcSetting.query.first() # single row table
        return settings

    @api.expect(settings_arguments)
    @api.marshal_with(simpleResponse)
    def post(self):
        """
        Sets all system settings.
        """
        args = settings_arguments.parse_args(request)
        spw = args['default_seconds_per_workunit'] 
        wtf = args['default_workunit_timeout_factor']
        hta = args['default_hwmon_temp_abort']
        dba = args['default_bench_all']
        dca = args['default_distribution_coefficient_alpha']
        tpmin = args['default_t_pmin']
        ruw = args['default_ramp_up_workunits']
        rdc = args['default_ramp_down_coefficient']

        settings = FcSetting.query.first()
        if (spw is not None): settings.default_seconds_per_workunit = spw
        if (wtf is not None): settings.default_workunit_timeout_factor = wtf
        if (hta is not None): settings.default_hwmon_temp_abort = hta
        if (dba is not None): settings.default_bench_all = dba
        if (dca is not None): settings.default_distribution_coefficient_alpha = dca
        if (tpmin is not None): settings.default_t_pmin = tpmin
        if (ruw is not None): settings.default_ramp_up_workunits = ruw
        if (rdc is not None): settings.default_ramp_down_coefficient = rdc
        db.session.commit()

        return {
            'status': True,
            'message': 'Settings saved.'
        }