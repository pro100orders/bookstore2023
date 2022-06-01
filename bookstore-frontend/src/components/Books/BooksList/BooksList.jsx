import {Card, CardActions, CardContent, Skeleton, Typography} from "@mui/material";
import Book from "../Book/Book";

const BooksList = ({books, isLoading, setBooks, isBasket}) => {

    const mockList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <div>
            {
                isLoading ?
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {mockList.map(id =>
                            <Card sx={{maxWidth: "200px", margin: 1}}>
                                <Skeleton variant="rectangular" width={200} height={370}/>
                                <CardContent sx={{height: 120}}>
                                    <Skeleton variant="text"/>
                                    <Skeleton variant="text"/>
                                    <Skeleton variant="text"/>
                                    <Skeleton variant="text"/>
                                </CardContent>
                                <CardActions style={{display: "flex", justifyContent: "space-between"}}>
                                    <Skeleton variant="circular" width={42} height={42}/>
                                    <Skeleton variant="rectangular" width={90} height={36}/>
                                </CardActions>
                            </Card>
                        )}
                    </div>
                    :
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {
                            books.length === 0 &&
                            <Typography variant="h5" component="div">
                                Книг нема
                            </Typography>
                        }
                        {
                            books.map(book =>
                                <Book book={book} key={book.id} setBooks={setBooks} isBasket={isBasket}/>
                            )
                        }
                    </div>
            }
        </div>
    );
};

export default BooksList;