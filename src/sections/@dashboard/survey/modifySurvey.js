import PropTypes from 'prop-types';

import SurveyForm from './surveyForm/surveyForm';

ModalModifySurvey.propTypes = {
    status: PropTypes.bool,
    data: PropTypes.object
}

export default function ModalModifySurvey({status, data}) {

    return (
        <SurveyForm status={status} mode={false} data={data} />
    ); 
}