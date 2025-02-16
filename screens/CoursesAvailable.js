// Importing required modules and components
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import { useFocusEffect } from '@react-navigation/native';
import axios from 'axios';
import CourseDetailsToJoin from '../components/CourseDetailsToJoin';
import { GLOBAL_CONFIG } from '../components/global_config';

const CoursesAvailable = () => {
    // State variables to manage courses, loading state, and error state
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch courses from the backend
    const fetchCourses = () => {
        axios.get(`http://${GLOBAL_CONFIG.SYSTEM_IP}:${GLOBAL_CONFIG.PORT}/coursesAvailable`)
            .then((response) => {
                setCourses(response.data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    };

    // Fetch courses when the screen is focused
    useFocusEffect(
        React.useCallback(() => {
            fetchCourses();
        }, [])
    );

    // Display loading indicator while fetching data
    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007BFF" />
                <Text style={styles.loadingText}>Loading courses...</Text>
            </View>
        );
    }

    // Display error message if there is an error fetching data
    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>Error loading courses: {error}</Text>
            </View>
        );
    }

    // Display the list of available courses
    return (
        <View style={styles.container}>
            {courses.length > 0 ? (
                <ScrollView>
                    {courses.map((course) => (
                        <CourseDetailsToJoin
                            key={course._id}
                            course={course.subject}
                            instructor={course.instructor}
                            courseId={course.classId}
                        />
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.noCoursesContainer}>
                    <Text style={styles.noCoursesText}>No Courses Available</Text>
                </View>
            )}
        </View>
    );
};

export default CoursesAvailable;

// Styles for the component
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8F9FA',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingVertical: 20,
        paddingHorizontal: 16,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#6C757D',
    },
    errorText: {
        fontSize: 16,
        color: '#DC3545',
    },
    noCoursesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noCoursesText: {
        fontSize: 18,
        color: '#6C757D',
        textAlign: 'center',
    },
});
