import { useState } from 'react'
import SearchBar from './components/SearchBar'
import ArtistDisplay from './components/ArtistDisplay'
import AlbumGrid from './components/AlbumGrid'
import ChatBox from './components/ChatBox'
import { searchArtist, getArtistDetails, getArtistAlbums } from './services/spotifyService'

function App() {
  const [artist, setArtist] = useState(null)
  const [albums, setAlbums] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleSearch = async (query) => {
    if (!query.trim()) return
    
    setLoading(true)
    setError(null)
    
    try {
      // Search for artist
      const searchResult = await searchArtist(query)
      if (!searchResult) {
        setError('No artist found')
        return
      }
      
      // Get detailed artist info
      const artistDetails = await getArtistDetails(searchResult.id)
      setArtist(artistDetails)
      
      // Get artist's albums
      const artistAlbums = await getArtistAlbums(searchResult.id)
      setAlbums(artistAlbums)
      
    } catch (err) {
      setError('Failed to fetch artist data')
      console.error('Search error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-gray-900">Artist Insight Explorer</h1>
          <p className="text-gray-600 mt-2">Discover artists and get AI-powered insights</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <SearchBar onSearch={handleSearch} loading={loading} />
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Artist Results */}
        {artist && (
          <div className="space-y-8">
            {/* Artist Info */}
            <ArtistDisplay artist={artist} />
            
            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Albums Section */}
              <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Albums</h2>
                <AlbumGrid albums={albums} />
              </div>
              
              {/* Chat Section */}
              <div className="lg:col-span-1">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Ask AI</h2>
                <ChatBox artistName={artist.name} />
              </div>
            </div>
          </div>
        )}

        {/* Welcome Message */}
        {!artist && !loading && !error && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Search for any artist to get started
              </h2>
              <p className="text-gray-600">
                Discover detailed information about your favorite artists and get AI-powered insights about their music and career.
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
