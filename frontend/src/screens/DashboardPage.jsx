import React, { useEffect, useState } from 'react';
import config from '../constants.js';

const DashboardPage = ({ user, onLogout, manifest }) => {
  const [transformPairs, setTransformPairs] = useState([]);
  const [exampleProblems, setExampleProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newPair, setNewPair] = useState({ timeDomainFunction: '', laplaceDomainFunction: '', description: '', category: 'basic' });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setLoading(true);
    try {
      const [pairsRes, problemsRes] = await Promise.all([
        manifest.from('TransformPair').find({ include: ['owner'], sort: { createdAt: 'desc' } }),
        manifest.from('ExampleProblem').find({ include: ['owner'], sort: { createdAt: 'desc' } })
      ]);
      setTransformPairs(pairsRes.data);
      setExampleProblems(problemsRes.data);
    } catch (error) {
      console.error('Failed to load data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreatePair = async (e) => {
    e.preventDefault();
    try {
      await manifest.from('TransformPair').create(newPair);
      setNewPair({ timeDomainFunction: '', laplaceDomainFunction: '', description: '', category: 'basic' });
      loadData(); // Refresh list
    } catch (error) {
      console.error('Failed to create transform pair:', error);
      alert('Error: Could not create the transform pair.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold text-gray-900">Welcome, {user.name}!</h1>
            <p className="text-sm text-gray-500">Role: {user.role}</p>
          </div>
          <div className="space-x-4">
            <a href={`${config.BACKEND_URL}/admin`} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-gray-600 hover:text-blue-500">Admin Panel</a>
            <button onClick={onLogout} className="text-sm font-medium text-red-600 hover:text-red-800">Logout</button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
             {/* Transform Pairs List */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Transform Pair Library</h2>
              {loading ? <p>Loading pairs...</p> : (
                <div className="space-y-4">
                  {transformPairs.map(pair => (
                    <div key={pair.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                           <p className="font-mono text-lg"><span className="font-bold">f(t) =</span> {pair.timeDomainFunction}</p>
                           <p className="font-mono text-lg text-blue-600"><span className="font-bold">F(s) =</span> {pair.laplaceDomainFunction}</p>
                        </div>
                        <span className="text-xs font-medium bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{pair.category}</span>
                      </div>
                      {pair.description && <p className="text-sm text-gray-600 mt-2">{pair.description}</p>}
                      <p className="text-xs text-gray-400 mt-2">Contributed by: {pair.owner?.name || 'Unknown'}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

             {/* Example Problems */}
            <div className="bg-white p-6 rounded-lg shadow">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Example Problems</h2>
               {loading ? <p>Loading problems...</p> : (
                <div className="space-y-4">
                  {exampleProblems.map(problem => (
                    <details key={problem.id} className="border border-gray-200 rounded-lg p-4 cursor-pointer">
                        <summary className="font-semibold flex justify-between items-center">
                          {problem.title}
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${problem.difficulty === 'easy' ? 'bg-green-100 text-green-800' : problem.difficulty === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'}`}>{problem.difficulty}</span>
                        </summary>
                        <div className="mt-4 pt-4 border-t border-gray-200">
                           <h4 className="font-bold">Problem:</h4>
                           <p className="text-gray-700 whitespace-pre-wrap">{problem.problemStatement}</p>
                           <h4 className="font-bold mt-4">Solution:</h4>
                           <p className="text-gray-700 whitespace-pre-wrap">{problem.solution}</p>
                        </div>
                    </details>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Create New Pair Form */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg shadow sticky top-28">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Contribute a Transform Pair</h2>
              <form onSubmit={handleCreatePair} className="space-y-4">
                <input type="text" placeholder="f(t) = e.g., 't^2'" value={newPair.timeDomainFunction} onChange={(e) => setNewPair({...newPair, timeDomainFunction: e.target.value})} className="w-full p-2 border rounded-md" required />
                <input type="text" placeholder="F(s) = e.g., '2/s^3'" value={newPair.laplaceDomainFunction} onChange={(e) => setNewPair({...newPair, laplaceDomainFunction: e.target.value})} className="w-full p-2 border rounded-md" required />
                <textarea placeholder="Description (optional)" value={newPair.description} onChange={(e) => setNewPair({...newPair, description: e.target.value})} className="w-full p-2 border rounded-md" rows="3" />
                <select value={newPair.category} onChange={(e) => setNewPair({...newPair, category: e.target.value})} className="w-full p-2 border rounded-md bg-white">
                    <option value="basic">Basic</option>
                    <option value="property">Property</option>
                    <option value="special_function">Special Function</option>
                </select>
                <button type="submit" className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300">Submit Pair</button>
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
