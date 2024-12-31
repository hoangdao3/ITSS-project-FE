import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const ExerciseDetail = () => {
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    const fetchExercise = async () => {
      try {
        const response = await fetch("/data_exercises.json");
        const data = await response.json();
        const foundExercise = data.exercises.find(
          (ex) => ex.id === parseInt(id)
        );
        setExercise(foundExercise);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching exercise data:", error);
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  }

  if (!exercise) {
    return (
      <div className="flex justify-center items-center h-screen">
        Exercise not found
      </div>
    );
  }

  return (
    <div className="flex justify-center bg-gray-100 h-screen overflow-y-auto">
      <div className="w-full max-w-4xl mx-auto px-4 py-6">
        <div className="bg-white shadow-lg rounded-lg w-full p-6">
          <h2 className="text-2xl font-bold mb-3">{exercise.title}</h2>

          {/* Title and Info */}
          <div className="flex justify-between items-center mb-4">
            <div>
              <h3 className="text-lg font-semibold">{exercise.title}</h3>
              <p className="text-sm text-gray-500">Total: {exercise.duration}</p>
            </div>
          </div>

          {/* Image */}
          <img
            src={exercise.coverImage}
            alt={exercise.title}
            className="rounded-lg mb-4 object-cover h-40 w-full"
          />

          {/* Description */}
          <p className="text-gray-600 text-sm mb-4">{exercise.description}</p>

          {/* Exercise List */}
          <div className="space-y-3">
            {exercise.poses.map((pose) => (
              <div
                key={pose.id}
                className="flex justify-between items-center border-b border-gray-200 pb-3"
              >
                <div className="flex items-center space-x-3">
                  <img
                    src={pose.image}
                    alt={pose.name}
                    className="rounded-lg w-16 h-16 object-cover"
                  />
                  <p className="text-gray-800 text-sm">{pose.name}</p>
                </div>
                <span className="text-gray-500 text-sm">{pose.duration}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExerciseDetail;