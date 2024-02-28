import PropTypes from 'prop-types';

import SurveyForm from './surveyForm/surveyForm';

ModalAddSurvey.propTypes = {
    status: PropTypes.bool
}

export default function ModalAddSurvey({status}) {

    return (
        <SurveyForm status={status} mode data={null} />
    ); 
}