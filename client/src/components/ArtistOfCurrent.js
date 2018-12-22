import React from 'react';
import {connect} from 'react-redux';

class ArtistOfCurrent extends React.Component{

  render(){

    let {
      currentArtist,
    } = this.props;

    let artistName;
    let artistBio;
    let artistImage;
    let artistSimilar = [];
    let artistTags = [];

    if (currentArtist) {
      artistName = currentArtist.name;

      if (currentArtist.bio) {
        artistBio = currentArtist.bio.content;
      }
      if (currentArtist.image) {
        artistImage = currentArtist.image[currentArtist.image.length - 1]['#text'];
      }

      artistSimilar = currentArtist.similar;
      artistTags = currentArtist.tags;
    }

    return(
      <div className="artist_container">
        <img src={artistImage} className="artist_image" alt={artistName} />
        {artistName}
        {artistBio}
        <br/><br/>
        {artistSimilar && artistSimilar.length? artistSimilar.map((value, key) =>
          <div key={key}>
            {value.name}
          </div>
        )
        :null}
        {artistTags && artistTags.length? artistTags.map((value, key) =>
          <div key={key}>
            {value.name}
          </div>
        )
        :null}
      </div>
	  );
  }
}

export default connect(
  (state, ownProps) => ({
    currentArtist: state.lastfm.currentArtist,
  }),
  dispatch => ({
  }),
)(ArtistOfCurrent);
