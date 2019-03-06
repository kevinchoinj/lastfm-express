import lastfm from 'reducers/lastfm';
import panels from 'reducers/panels';
import transition from 'reducers/transition';
import { reducer as reducerForm } from 'redux-form';

import {createSelector} from 'reselect';

const reducers={
  lastfm,
  panels,
  transition,

  form: reducerForm,
};

export default reducers;

/* - current track - */
export const selectCurrentTrack = (state) => state.lastfm.currentTrack;

export const selectCurrentTrackName = createSelector(
  selectCurrentTrack,
  (currentTrack) => currentTrack ? currentTrack.name : ''
);

export const selectCurrentTrackArtist = createSelector(
  selectCurrentTrack,
  (currentTrack) => currentTrack ? currentTrack.artist : ''
);
export const selectCurrentTrackArtistText = createSelector(
  selectCurrentTrackArtist,
  (currentTrackArtist) => {
    if (currentTrackArtist) {
      return currentTrackArtist['#text'];
    }
  }
);

export const selectCurrentTrackImage = createSelector(
  selectCurrentTrack,
  (currentTrack) => currentTrack ? currentTrack.image : ''
);
export const selectCurrentTrackImageQuality = createSelector(
  selectCurrentTrackImage,
  (currentTrackImage) => {
    if (currentTrackImage) {
      return currentTrackImage[currentTrackImage.length - 1]['#text'];
    }
  }
);

/* - current artist - */
export const selectCurrentArtist = (state) => state.lastfm.currentArtist;

export const selectCurrentArtistName = createSelector(
  selectCurrentArtist,
  (currentArtist) => currentArtist ? currentArtist.name : ''
);

export const selectCurrentArtistBio = createSelector(
  selectCurrentArtist,
  (currentArtist) => currentArtist ? currentArtist.bio : ''
);
export const selectCurrentArtistBioContent = createSelector(
  selectCurrentArtistBio,
  (currentArtistBio) => currentArtistBio ? currentArtistBio.content : ''
);

export const selectCurrentArtistImage = createSelector(
  selectCurrentArtist,
  (currentArtist) => {
    return currentArtist.image ;
  }
);
export const selectCurrentArtistImageQuality = createSelector(
  selectCurrentArtistImage,
  (currentArtistImage) => currentArtistImage ? currentArtistImage[2]['#text'] : ''
);

export const selectCurrentArtistSimilar = createSelector(
  selectCurrentArtist,
  (currentArtist) => currentArtist ? currentArtist.similar : ''
);
export const selectCurrentArtistSimilarArtists = createSelector(
  selectCurrentArtistSimilar,
  (currentArtistSimilar) => currentArtistSimilar ? currentArtistSimilar.artist : ''
);

export const selectCurrentArtistTags = createSelector(
  selectCurrentArtist,
  (currentArtist) => currentArtist ? currentArtist.similar : ''
);
export const selectCurrentArtistTagsText = createSelector(
  selectCurrentArtistTags,
  (currentArtistTags) => currentArtistTags ? currentArtistTags.tags : ''
);

/* - similar to current track - */
export const selectCurrentSimilar = (state) => state.lastfm.currentSimilar;

/* - current path - */
export const selectCurrentPath = (state) => state.panels.currentPath;

export const selectCurrentPathName = createSelector(
  selectCurrentPath,
  (currentPath) => currentPath.name
);
export const selectCurrentPathArtist = createSelector(
  selectCurrentPath,
  (currentPath) => currentPath.artist
);

/* - all similar tracks - */
export const selectSimilarTracks = (state) => state.lastfm.similarTracks;

/* - choose from similar tracks - */
export const selectSelectedSimilarTracks = createSelector(
  selectSimilarTracks,
  selectCurrentPathName,
  selectCurrentPathArtist,
  (similarTracks, currentPathName, currentPathArtist) => {
    if (similarTracks) {
      return similarTracks[currentPathArtist+'-'+currentPathName];
    }
  }
);
