import React from 'react';
import {connect} from 'react-redux';

class ArtistOfCurrent extends React.Component{

  createMarkup = (text) => {
    return {__html: text};
  }

  render(){

    const {
      artistName,
      artistBio,
      artistImage,
      artistSimilar,
      artistTags,
    } = this.props;

    return(
      <div className="artist_container">
        <div className="artist_left">
          <img src={artistImage} className="artist_image" alt={artistName} />
          <div className="artist_name">
            <strong>
              {artistName}
            </strong>
          </div>
          <div className="artist_left__block">
            <strong>Similar Artists</strong>
            {artistSimilar && artistSimilar.length? artistSimilar.map((value, key) =>
              <div key={key}>
                {value.name}
              </div>
            )
              :null}
          </div>
          <div className="artist_left__block">
            <strong>Tags</strong>
            {artistTags && artistTags.length? artistTags.map((value, key) =>
              <div key={key}>
                {value.name}
              </div>
            )
              :null}
          </div>
        </div>
        <div className="artist_right">
          <div>
            <div dangerouslySetInnerHTML={this.createMarkup(artistBio)} />
          </div>

        </div>
      </div>
    );
  }
}

export default connect(
  (state) => {
    const currentArtist = state.lastfm.currentArtist;
    let artistName;
    let artistBio;
    let artistImage;
    let artistSimilar;
    let artistTags;

    let artistImages;

    if (currentArtist) {
      artistName = currentArtist.name;
      if (currentArtist.bio) {
        artistBio = currentArtist.bio.content;
      }
      if (currentArtist.image && currentArtist.image[currentArtist.image.length - 1]) {
        artistImages = currentArtist.image[currentArtist.image.length - 1];
        if (artistImages) {
          artistImage = artistImages['#text'];
        }
      }
      if (currentArtist.similar) {
        artistSimilar = currentArtist.similar.artist;
      }
      if (currentArtist.tags) {
        artistTags = currentArtist.tags.tag;
      }
    }
    return {
      artistName,
      artistBio,
      artistImage,
      artistSimilar,
      artistTags,
    };
  },

)(ArtistOfCurrent);
