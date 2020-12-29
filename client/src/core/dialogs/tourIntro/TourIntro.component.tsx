import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import { Dialog, DialogActions, DialogContent, DialogTitle } from '~components/dialogs';
import { DialogLoadingSpinner } from '~components/loaders/loaders';
import GearIcon from '@material-ui/icons/Settings';
import ListIcon from '@material-ui/icons/FormatListBulleted';
import PreviewIcon from '@material-ui/icons/Visibility';
import PersonIcon from '@material-ui/icons/Person';
import { getTourComponents } from '~utils/generalUtils';
import styles from './TourIntro.scss';
import { useWindowSize } from 'react-hooks-window-size';

type Tour = 'intro' | 'gridPanel' | 'previewPanel' | 'yourAccount';

export type TourDialogProps = {
	tourIntroDialogVisible: boolean;
	onCompleteTour: () => void;
	currentTour: Tour;
	onClose: () => void;
	tourBundleLoaded: boolean;
	loadTourBundle: () => void;
	saveGeneratorState: () => void;
	restoreGeneratorState: () => void;
	i18n: any;
};

const TourDialog = ({
	tourIntroDialogVisible, onCompleteTour, onClose, tourBundleLoaded, loadTourBundle, restoreGeneratorState,
	saveGeneratorState, i18n
}: TourDialogProps): JSX.Element => {
	const windowSize = useWindowSize();

	const [loadingBundle, setLoadingBundle] = useState(false);
	const [currentTour, setCurrentTour] = useState<Tour | null>(null);

	useEffect(() => {
		if (tourBundleLoaded && currentTour !== null) {
			onClose();
		}
	}, [tourBundleLoaded, currentTour]);

	useEffect(() => {
		if (tourIntroDialogVisible) {
			setLoadingBundle(false);

		// unreadable logic, but this fires when the tour dialog was just hidden and there's a tour slated to be shown.
		// It saves the current generator state before the tour messes around with it
		} else if (currentTour !== null) {
			saveGeneratorState();
		}
	}, [tourIntroDialogVisible]);


	// hide the tour if the screen gets too small
	useEffect(() => {
		if (windowSize.width < 900) {
			if (tourIntroDialogVisible || currentTour !== null) {
				closeIntroDialog();
			}
		}
	}, [windowSize.width]);

	const closeIntroDialog = (): void => {
		setCurrentTour(null);
		onClose();
	};

	const selectTour = (tour: Tour): void => {
		// load the tour bundle and show a loading spinner until it's ready. At that point, we backup the current
		// generator settings, close this intro dialog and open the selected tour
		setLoadingBundle(true);
		setCurrentTour(tour);

		if (!tourBundleLoaded) {
			loadTourBundle();
		} else {
			onClose();
		}
	};

	// when a user exits a tour they're taken back to the intro panel again
	const onExit = (): void => {
		restoreGeneratorState();
		setCurrentTour(null);
		onCompleteTour(); // maybe just rename to showIntroDialog ?
	};

	const getCurrentTour = (): JSX.Element | null => {
		if (tourIntroDialogVisible || !currentTour || !tourBundleLoaded) {
			return null;
		}

		const tours = getTourComponents();
		const Tour = tours[currentTour].component;

		return (
			<Tour
				isOpen={true}
				onClose={onExit}
				i18n={i18n}
				maskClassName={styles.tourMask}
				closeWithMask={false}
				disableInteraction={true}
				className={styles.tourPage}
				accentColor="#275eb5"
			/>
		);
	};

	return (
		<>
			<Dialog onClose={closeIntroDialog} open={tourIntroDialogVisible}>
				<div style={{ width: 600 }}>
					<DialogTitle onClose={onClose}>{i18n.takeTour}</DialogTitle>
					<DialogContent dividers className={styles.introDialog}>
						<div className={styles.cols}>
							<div className={styles.col}>
								<h3>{i18n.welcomeToTheGenerator}</h3>

								<p>
									{i18n.tourIntroPara1}
								</p>

								<p>
									{i18n.tourIntroPara2}
								</p>
							</div>

							<div className={styles.separator} />

							<div className={`${styles.col} ${styles.buttonCol}`}>
								<div>
									<Button color="primary" variant="outlined" onClick={(): void => selectTour('intro')}>
										<GearIcon />
										{i18n.introToGenerator}
									</Button>
								</div>
								<div>
									<Button color="primary" variant="outlined" onClick={(): void => selectTour('gridPanel')}>
										<ListIcon />
										{i18n.theGridPanel}
									</Button>
								</div>
								<div>
									<Button color="primary" variant="outlined" onClick={(): void => selectTour('previewPanel')}>
										<PreviewIcon />
										{i18n.thePreviewPanel}
									</Button>
								</div>
								<div>
									<Button color="primary" variant="outlined" disabled={true} onClick={(): void => selectTour('yourAccount')}>
										<PersonIcon />
										{i18n.yourUserAccount}
									</Button>
								</div>
							</div>
						</div>
					</DialogContent>
					<DialogActions>
						<Button onClick={closeIntroDialog} color="default" variant="outlined">{i18n.close}</Button>
					</DialogActions>
				</div>
				<DialogLoadingSpinner visible={loadingBundle} />
			</Dialog>
			{getCurrentTour()}
		</>
	);
};

export default TourDialog;
