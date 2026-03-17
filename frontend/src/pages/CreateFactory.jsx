import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Building2, MapPin, Tag, Zap } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useData } from '../context/DataContext';

const CreateFactory = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addFactory, getFactoryByOwner } = useData();
  const [loading, setLoading] = useState(false);
  
  const existingFactory = getFactoryByOwner(user?.email);

  useEffect(() => {
    if (existingFactory) {
      navigate('/factory-dashboard');
    }
  }, [existingFactory, navigate]);

  const [formData, setFormData] = useState({
    name: '',
    location: '',
    type: 'Automotive',
    hasPPA: false,
    ppaSource: 'Solar Plant'
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ 
      ...prev, 
      [name]: type === 'checkbox' ? checked : value 
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Add factory to global state
      addFactory({
        ...formData,
        ownerEmail: user.email
      });
      
      navigate('/factory-dashboard');
    } catch (error) {
      console.error("Failed to create factory", error);
    } finally {
      setLoading(false);
    }
  };

  if (existingFactory) return null; // Prevent flash before redirect

  return (
    <div className="max-w-2xl mx-auto mt-4">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Register New Factory</h1>
        <p className="text-gray-500 mt-1">Enter your facility details to start tracking emissions.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Factory Name
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Building2 className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 border"
                placeholder="e.g. Alpha Manufacturing Plant"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                name="location"
                required
                value={formData.location}
                onChange={handleChange}
                className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 border"
                placeholder="e.g. Austin, TX"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Industry Type
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Tag className="h-5 w-5 text-gray-400" />
              </div>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 border bg-white"
              >
                <option value="Automotive">Automotive</option>
                <option value="Textile">Textile</option>
                <option value="Food Processing">Food Processing</option>
                <option value="Electronics">Electronics</option>
                <option value="Steel">Steel</option>
              </select>
            </div>
          </div>

          <div className="pt-4 border-t border-gray-100">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium text-gray-900">Power Purchase Agreement (PPA)</label>
                <p className="text-sm text-gray-500">Do you have a direct renewable energy agreement?</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  name="hasPPA"
                  checked={formData.hasPPA}
                  onChange={handleChange}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-emerald-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
              </label>
            </div>
          </div>

          {formData.hasPPA && (
            <div className="animate-in fade-in slide-in-from-top-2 duration-300">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                PPA Energy Source
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Zap className="h-5 w-5 text-gray-400" />
                </div>
                <select
                  name="ppaSource"
                  value={formData.ppaSource}
                  onChange={handleChange}
                  className="focus:ring-emerald-500 focus:border-emerald-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2.5 border bg-white"
                >
                  <option value="Solar Plant">Solar Plant</option>
                  <option value="Wind Farm">Wind Farm</option>
                  <option value="Hydro Plant">Hydro Plant</option>
                  <option value="Coal Power Plant">Coal Power Plant</option>
                </select>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-gray-100 flex justify-end">
            <button
              type="button"
              onClick={() => navigate('/factory-dashboard')}
              className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 mr-3"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 disabled:opacity-50"
            >
              {loading ? 'Registering...' : 'Register Factory'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateFactory;
