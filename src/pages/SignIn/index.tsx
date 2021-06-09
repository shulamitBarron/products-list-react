import * as React from 'react';
import { baseConnectForm } from '@base/features/base-redux-react-connect';
import { TranslateFunction } from 'react-localize-redux';
import { Container, Row } from 'react-bootstrap';
import { ApplicationState } from 'actions/redux';
import { Field, InjectedFormProps } from 'redux-form';
import { Dispatch } from 'redux';
import { Gender, User } from 'actions/redux/userData/interfaces';
import UserDataActions, { userDataSelector } from 'actions/redux/userData';
import { Redirect } from 'react-router-dom';
import {
	required, maxLength, normalizePhone, parseGender, phoneNumber, alphaNumeric
} from './formUtils';

interface OwnProps {
	setUserData: (user: User) => void;
	userData: User;
	translate: TranslateFunction;
}

type Props = OwnProps & InjectedFormProps<User>;

class SignInPage extends React.Component<Props> {
	handleSubmit = (user: User) => {
		const { setUserData } = this.props;
		setUserData(user);
	};

	renderError = ({ meta: { touched, error, warning } }: any) => {
		return (
			<small className="form-text text-muted mb-2 h-25 d-inline-block">
				{
					touched
					&& (
						<>
							{error}
							{warning}
						</>
					)
				}
			</small>
		);
	};

	renderFiled = (fieldData: any) => {
		const { input, label, type } = fieldData;
		return (
			<div className="">
				<label className="form-label">{label}</label>
				<div>
					{/* eslint-disable-next-line react/jsx-props-no-spreading */}
					<input className="form-control" {...input} placeholder={label} type={type} />
					{this.renderError(fieldData)}
				</div>
			</div>
		);
	};

	render() {
		const {
			translate, handleSubmit, pristine, reset, submitting, userData
		} = this.props;

		if (userData) {
			return <Redirect push to="/" />;
		}

		return (
			<Container>
				<Row className="justify-content-md-center w-100">
					<form onSubmit={handleSubmit(this.handleSubmit)}>
						<Row>
							<Field
								name="firstName"
								label={translate('signIn.firstName')}
								component={this.renderFiled}
								className="form-control"
								type="text"
								placeholder={translate('signIn.firstName')}
								validate={[required, maxLength]}
								warn={alphaNumeric}
							/>
						</Row>
						<Row>
							<Field
								name="lastName"
								label={translate('signIn.lastname')}
								component={this.renderFiled}
								className="form-control"
								type="text"
								placeholder={translate('signIn.lastname')}
								validate={[required, maxLength]}
								warn={alphaNumeric}
							/>
						</Row>
						<Row>
							<Field
								name="phone"
								label={translate('signIn.phone')}
								component={this.renderFiled}
								className="form-control"
								type="text"
								placeholder={translate('signIn.phone')}
								normalize={normalizePhone}
								validate={[required, phoneNumber]}
							/>
						</Row>
						<Row>
							<label className="mb-0 mr-2">
								<Field
									name="gender"
									component="input"
									type="radio"
									value={Gender.MALE}
									parse={parseGender}
									className="mr-2"
								/>
								{translate('signIn.male')}
							</label>
							<label className="mb-0 mr-2">
								<Field
									name="gender"
									component="input"
									type="radio"
									value={Gender.FEMALE}
									parse={parseGender}
									className="mr-2"
								/>
								{translate('signIn.female')}
							</label>
						</Row>
						<Row>
							<Field name="gender" validate={[required]} component={this.renderError} />
						</Row>
						<Row>
							<button type="submit" disabled={submitting} className="btn btn-primary">
								{translate('signIn.signIn')}
							</button>
							<button type="button" disabled={pristine || submitting} onClick={reset} className="btn">
								{translate('signIn.clear')}
							</button>
						</Row>
					</form>
				</Row>
			</Container>
		);
	}
}

export default baseConnectForm(SignInPage,
	(state: ApplicationState) => {
		return {
			userData: userDataSelector.getUserData(state),
		};
	},

	(dispatch: Dispatch) => {
		return {
			setUserData: (user: User) => dispatch(UserDataActions.setUserData(user)),
		};
	},

	{
		form: 'SignInForm'
	});
