export const calculateDateDifference = (dueDate) => {
    const currentDate = new Date();
    const parsedDueDate = new Date(dueDate);
    const differenceMs = parsedDueDate - currentDate;
    const differenceDays = Math.floor(differenceMs / (1000 * 60 * 60 * 24));
    return differenceDays;
};

export const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // Extracts only the date part
};
