const AlbumCard = ({ album }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
      <div className="aspect-square">
        <img
          src={album.images?.[0]?.url || '/placeholder-album.png'}
          alt={album.name}
          className="w-full h-full object-cover rounded-t-lg"
        />
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">{album.name}</h3>
        <p className="text-sm text-gray-600 mb-2">
          {formatDate(album.release_date)} • {album.album_type}
        </p>
        <p className="text-xs text-gray-500">
          {album.total_tracks} track{album.total_tracks !== 1 ? 's' : ''}
        </p>
        
        {album.external_urls?.spotify && (
          <a
            href={album.external_urls.spotify}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center text-green-600 hover:text-green-700 text-sm font-medium"
          >
            <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/>
            </svg>
            Listen
          </a>
        )}
      </div>
    </div>
  );
};

const AlbumGrid = ({ albums }) => {
  if (!albums || albums.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No albums found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {albums.map((album) => (
        <AlbumCard key={album.id} album={album} />
      ))}
    </div>
  );
};

export default AlbumGrid;
