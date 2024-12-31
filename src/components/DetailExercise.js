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
      <div className="max-w-4xl mx-auto p-4 flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (!exercise) {
    return <div className="max-w-4xl mx-auto p-4">Exercise not found</div>;
  }

  return (
    <div className="fixed flex flex-col items-center bg-white w-full max-w-6xl min-h-screen ml-64 mt-28">
      <div className="bg-gray-50 shadow-lg rounded-lg w-full max-w-6xl p-8">
        <h2 className="text-3xl font-bold mb-4">{exercise.title}</h2>

        {/* Title and Info */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h3 className="text-xl font-semibold">{exercise.title}</h3>
            <p className="text-sm text-gray-500">Total: {exercise.duration}</p>
          </div>
        </div>

        {/* Image */}
        <img
          src={exercise.coverImage}
          alt={exercise.title}
          className="rounded-lg mb-5 object-cover h-48"
        />

        {/* Description */}
        <p className="text-gray-600 text-sm mb-5">{exercise.description}</p>

        {/* Exercise List */}
        <div className="space-y-4">
          {exercise.poses.map((pose) => (
            <div
              key={pose.id}
              className="flex justify-between items-center border-b border-gray-200 pb-4"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={pose.image}
                  alt={pose.name}
                  className="rounded-lg w-20 h-20 object-cover"
                />
                <p className="text-gray-800 text-sm">{pose.name}</p>
              </div>
              <span className="text-gray-500 text-sm">{pose.duration}</span>
            </div>
          ))}
        </div>

        {/* Start Button */}
        <button className="mt-6 w-full bg-black text-white text-base py-3 rounded-lg hover:bg-gray-800">
          Start
        </button>
      </div>
    </div>
  );
};

export default ExerciseDetail;
