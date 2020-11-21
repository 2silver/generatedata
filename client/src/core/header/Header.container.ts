import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import Header, { HeaderProps } from './Header.component';
import { GDLocale } from '~types/general';
import * as selectors from '../store/generator/generator.selectors';
import * as mainSelectors from '../store/main/main.selectors';
import * as actions from '../store/generator/generator.actions';
import * as mainActions from '../store/main/main.actions';
import { ClearType } from '../dialogs/clearGrid/ClearGrid.component';

const mapStateToProps = (state: any): Partial<HeaderProps> => ({
	i18n: selectors.getCoreI18n(state),
	locale: mainSelectors.getLocale(state),
	showIntroDialog: mainSelectors.shouldShowIntroDialog(state),
	isGridVisible: selectors.isGridVisible(state),
	isPreviewVisible: selectors.isPreviewVisible(state),
	smallScreenVisiblePanel: selectors.getSmallScreenVisiblePanel(state),
	builderLayout: selectors.getBuilderLayout(state),
	isLoggedIn: false // TODO soon!
});

const mapDispatchToProps = (dispatch: Dispatch): Partial<HeaderProps> => ({
	// @ts-ignore
	onChangeLocale: (locale: GDLocale): any => dispatch(mainActions.selectLocale(locale)),
	onChangeSmallScreenVisiblePanel: (): any => dispatch(actions.changeSmallScreenVisiblePanel()),
	toggleGrid: (): any => dispatch(actions.toggleGrid()),
	togglePreview: (): any => dispatch(actions.togglePreview()),
	toggleLayout: (): any => dispatch(actions.toggleLayout()),

	// @ts-ignore
	onClearGrid: (clearType: ClearType): any => dispatch(actions.clearGrid(clearType)),
	toggleIntroDialog: (): any => dispatch(mainActions.toggleIntroDialog()),
	toggleLoginDialog: (): any => dispatch(mainActions.toggleLoginDialog())
});

const container: any = connect(
	mapStateToProps,
	mapDispatchToProps
)(Header);

export default container;
