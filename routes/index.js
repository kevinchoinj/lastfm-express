import express from 'express';
import LastfmController from '../controllers/lastfm';
const router = express.Router();

router.get('/api/v1/lastfm/current', LastfmController.getCurrentTrack);
router.post('/api/v1/lastfm/current', LastfmController.postCurrentTrack);
router.post('/api/v1/lastfm/similar', LastfmController.postSimilarTracks);
router.post('/api/v1/lastfm/artist', LastfmController.postArtistInfo);

export default router;