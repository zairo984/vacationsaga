import { FC, useEffect, useState } from 'react';
import { Property } from "@/types/property"; // Adjust path as needed

const GreecePage: FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const response = await fetch('/api/properties/greece');
        const data: Property[] = await response.json();
        setProperties(data);
      } catch (error) {
        console.error('Failed to fetch properties:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Properties in Greece</h1>
      <ul>
        {properties.map(property => (
          <li key={property._id.toString()}>{property.placeName}</li>
        ))}
      </ul>
    </div>
  );
};

export default GreecePage;
