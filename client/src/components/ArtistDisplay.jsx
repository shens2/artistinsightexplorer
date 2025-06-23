const ArtistDisplay = ({ artist }) => {
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Artist Image */}
        <div className="flex-shrink-0">
          <img
            src={artist.images?.[0]?.url || '/placeholder-artist.png'}
            alt={artist.name}
            className="w-48 h-48 object-cover rounded-lg shadow-md"
          />
        </div>
        
        {/* Artist Info */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">{artist.name}</h1>
          
          {/* Genres */}
          {artist.genres && artist.genres.length > 0 && (
            <div className="mb-4">
              <h3 className="text-sm font-medium text-gray-500 mb-2">GENRES</h3>
              <div className="flex flex-wrap gap-2">
                {artist.genres.slice(0, 5).map((genre, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium capitalize"
                  >
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900">
                {artist.popularity}%
              </div>
              <div className="text-sm text-gray-500">Popularity</div>
            </div>
            
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-2xl font-bold text-gray-900">
                {formatNumber(artist.followers?.total || 0)}
              </div>
              <div className="text-sm text-gray-500">Followers</div>
            </div>
            
            {artist.external_urls?.spotify && (
              <div className="bg-gray-50 rounded-lg p-3">
                <a
                  href={artist.external_urls.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-green-600 hover:text-green-700 font-medium"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
                  </svg>
                  Open in Spotify
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArtistDisplay;
