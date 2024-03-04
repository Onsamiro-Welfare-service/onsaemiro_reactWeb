import PropTypes from 'prop-types';

import SurveyForm from './surveyForm/surveyForm';

ModalAddSurvey.propTypes = {
    status: PropTypes.bool,
    close: PropTypes.func,
}

export default function ModalAddSurvey({status, close}) {

    return (
        <SurveyForm status={status} mode closeModal={close} />
    ); 
}