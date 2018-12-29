import React from 'react';
import { Field, reduxForm, reset } from 'redux-form';
import {connect} from 'react-redux';

const RenderField = ({
  input,
  type,
  placeholder,
  meta: { touched, error, warning }
}) => (
  <div>
    <input {...input}
      placeholder={placeholder}
      type={type}
      className="username_input"
    />
    {touched &&
      ((error && <span className="form_error">{error}</span>) ||
        (warning && <span className="form_error">{warning}</span>))}
  </div>
);

class UsernameForm extends React.Component {
  render() {
    const { handleSubmit} = this.props;

    return (
      <form onSubmit={handleSubmit} autoComplete="off" className="username_form">

        <div className="username_label">
          Last.fm Username
        </div>

        <div className="username_bottom">
          <Field
            name="username"
            component={RenderField}
            placeholder="Shodyra"
            type="text"
          />
          <button
            type="submit"
            className="username_button"
          >
            Submit
          </button>
        </div>
      </form>
    );
  }
}

function mapStateToProps(){
  return{
    initialValues: {
    },
  };
}
function mapDispatchToProps(){
  return {
  };
}

const afterSubmit = (result, dispatch) =>
  dispatch(reset('adminBasic'));

export default connect(mapStateToProps, mapDispatchToProps)(
  reduxForm({
    form: 'adminBasic',
    enableReinitialize: true,
    onSubmitSuccess: afterSubmit,
  })(UsernameForm)
);
