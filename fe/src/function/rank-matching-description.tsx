export const matchRatingRank = (rating: number) => {
    let rank;

    if(rating < 4){
        rank = "Poor"
    }else if (rating >= 4 && rating <= 6){
        rank = "Average"
    }else if (rating >= 6 && rating <= 7){
        rank = "Pleasant"
    }else if(rating >= 7 && rating <= 8){
        rank = "Good"
    }else if(rating >= 8 && rating <= 9){
        rank = "Very Good"
    }else if(rating >= 9){
        rank = "Exellent"
    }

    return rank;
} 