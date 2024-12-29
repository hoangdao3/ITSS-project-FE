import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ExerciseDetail = () => {
    const [exercise, setExercise] = useState(null);
    const [loading, setLoading] = useState(true);
    const { id } = useParams(); // Lấy ID từ URL

    useEffect(() => {
        const fetchExercise = async () => {
            try {
                const response = await fetch('/data_exercises.json'); 
                const data = await response.json();
                const foundExercise = data.exercises.find(
                    ex => ex.id === parseInt(id) // Tìm bài tập theo ID
                );
                setExercise(foundExercise);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching exercise data:', error);
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
        return (
            <div className="max-w-4xl mx-auto p-4">
                Exercise not found
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">{exercise.title}</h1>
            <p className="text-gray-600">Duration: {exercise.duration}</p>
            <img 
                src={exercise.coverImage} 
                alt={exercise.title} 
                className="w-full h-48 object-cover rounded-lg my-4" 
            />
            <span className="inline-block bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full mb-4">
                Level: {exercise.level}
            </span>
            <h3 className="font-semibold">Description</h3>
            <p className="text-gray-700 mb-4">{exercise.description}</p>
            <h4 className="font-semibold">Poses</h4>
            <div className="space-y-4">
                {exercise.poses.map(pose => (
                    <div key={pose.id} className="flex items-center">
                        <img 
                            src={pose.image} 
                            alt={pose.name} 
                            className="w-16 h-16 object-cover rounded-lg mr-4" 
                        />
                        <div>
                            <h4 className="font-semibold">{pose.name}</h4>
                            <p className="text-gray-600">{pose.duration}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExerciseDetail;