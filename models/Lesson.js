const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        topic: {
            type: String,
            required: true,
        },
        duration: {
            type: Number,
            required: true,
        },
        youtubeId: {
            type: String,
            required: false,
        },
        quizLink: {
            type: String,
            required: false,
        },
        baselineQuiz: {
            type: String,
            required: false,
            default: null
        },
        pathId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'LearningPath',
            required: true,
        },
        order: {
            type: Number,
            required: true,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Lesson', LessonSchema);
