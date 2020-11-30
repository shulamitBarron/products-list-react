const gulp = require('gulp');
const template = require('gulp-template');
const header = require('gulp-header');
const footer = require('gulp-footer');
const rename = require("gulp-rename");
const inject = require('gulp-inject-string');
const replace = require('gulp-replace');
const sass    = require('gulp-sass');

const CLIENT_PATH = 'src/';
const CLIENT_DIST_PATH = './dist';

/** ------------------- CLIENT ----------------------------- **/

gulp.task('createContainer', async  () => {
	let className = capitalizeFirstLate(getArg('className'));
	let folder = getArg('folder');
	if(folder) folder=folder +"/";
	let classNameLowerCase = lowerCaseFirstLater(className);

	if (!validateName(className, '--className', true)) return;

	createTemplate(
		'./generator/templates/client/container-template',
		`${process.env.INIT_CWD}/${CLIENT_PATH}${folder}${className}/index.tsx`,
		{
			className,
			classNameLowerCase
		}
	);
});

gulp.task('createFormContainer', async () => {
	let className = capitalizeFirstLate(getArg('className'));
	let folder = getArg('folder');
	if(folder) folder=folder +"/";
	let classNameLowerCase = lowerCaseFirstLater(className);

	if (!validateName(className, '--className', true)) return;

	createTemplate(
		'./generator/templates/client/form-container-template',
		`${process.env.INIT_CWD}/${CLIENT_PATH}${folder}${className}/index.tsx`,
		{
			className,
			classNameLowerCase
		}
	);

});

gulp.task('createComponent',async  () => {
	let componentName = capitalizeFirstLate(getArg('name'));
	let folder = getArg('folder');
	if(folder) folder=folder +"/";

	if (!validateName(componentName, '--name')) return;

	createTemplate(
		'./generator/templates/client/component-template',
		`${process.env.INIT_CWD}/${CLIENT_PATH}${folder}/${componentName}/index.tsx`,
		{name: componentName}
	);

});

gulp.task('createSaga',async () => {
	let sagaName = lowerCaseFirstLater(getArg('name'));
	let folder = 'actions/sagas'

	if (!validateName(sagaName, '--name', false)) return;


	createTemplate(
		'./generator/templates/client/saga-template',
		`${process.env.INIT_CWD}/${CLIENT_PATH}${folder}/${sagaName}/index.ts`,
		{
			sagaName,
			sagaNameUppercase: capitalizeFirstLate(sagaName)
		}
	);

	createTemplate(
		'./generator/templates/client/saga-index',
		`${process.env.INIT_CWD}/${CLIENT_PATH}${folder}/${sagaName}/sagas.ts`,
		{
			sagaName,
			sagaNameUppercase: capitalizeFirstLate(sagaName)
		}
	);

	createTemplate(
		'./generator/templates/client/saga-manager',
		`${process.env.INIT_CWD}/${CLIENT_PATH}${folder}/${sagaName}/manager.ts`,
		{
			sagaName,
			sagaNameUppercase: capitalizeFirstLate(sagaName)
		}
	);

});

gulp.task('createRedux',async () => {
	let reducerName = lowerCaseFirstLater(getArg('name'));
	let reducerNameCapital = capitalizeFirstLate(getArg('name'));
	let folder = 'actions/redux'

	if (!validateName(reducerName, '--name', false)) return;

	createTemplate(
		'./generator/templates/client/redux-template',
		`${process.env.INIT_CWD}/${CLIENT_PATH}${folder}/${reducerName}/index.ts`,
		{
			reducerName,
			reducerNameCapital
		}
	);

	createTemplate(
		'./generator/templates/client/redux-interfaces-template',
		`${process.env.INIT_CWD}/${CLIENT_PATH}${folder}/${reducerName}/interfaces.ts`,
		{
			reducerName,
			reducerNameCapital
		}
	);
});


/*** HELPERS ***/

function capitalize(str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function replaceText(src, dest, needle, text) {
	gulp.src(src)
		.pipe(replace(needle, text))
		.pipe(gulp.dest(dest));
}

function injectAfter(src, dest, injectAfter, injectValue) {
	return gulp.src(src)
		.pipe(inject.after(injectAfter, injectValue))
		.pipe(gulp.dest(dest));
}

function injectAppend(src, dest, inject) {
	return gulp.src(src)
		.pipe(header(inject))
		.pipe(gulp.dest(dest));
}

function createTemplate(src, dest, templateParams) {
	return gulp.src(src)
		.pipe(rename(dest))
		.pipe(template(templateParams))
		.pipe(gulp.dest("./"));
}

function addFooter(src, dest, footerTemplate, footerParams) {
	return gulp.src(src)
		.pipe(footer(footerTemplate, footerParams))
		.pipe(gulp.dest(dest));
}

function validateName(componentName, expectedParam, checkFirstIsUppercase) {
	if (!componentName) {
		console.error("ERR! You are not select mandatory parameter value " + expectedParam);
		return false;
	}

	if (componentName[0] !== componentName[0].toUpperCase() && checkFirstIsUppercase) {
		console.error("ERR!" + expectedParam + " value must start with uppercase");
		return false;
	}

	return true;
}


function getArg(name) {

	let i = process.argv.indexOf('--' + name);
	if (i > -1) {
		return process.argv[i + 1];
	}

	return null;

}


const capitalizeFirstLate = (s) => {
	if (typeof s !== 'string') return ''
	return s.charAt(0).toUpperCase() + s.slice(1)
};

const lowerCaseFirstLater = (s) => {
	if (typeof s !== 'string') return ''
	return s.charAt(0).toLowerCase() + s.slice(1)
};