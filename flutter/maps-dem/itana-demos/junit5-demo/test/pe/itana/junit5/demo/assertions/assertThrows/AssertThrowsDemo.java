package pe.itana.junit5.demo.assertions.assertThrows;

import static org.junit.jupiter.api.Assertions.assertThrows;

import org.junit.jupiter.api.Test;

import pe.itana.junit5.demo.bookstore.exception.BookNotFoundException;
import pe.itana.junit5.demo.bookstore.model.Book;
import pe.itana.junit5.demo.bookstore.service.BookService;

public class AssertThrowsDemo {
	
	@Test
	public void assertThrowsWithNoMessage() {
		BookService bookService = new BookService();
		
		Book headFirstJavaBook = new Book("1", "Head First Java", "Wrox");
		Book headFirstDesignPatternBook = new Book("2", "Head First Design Pattern", "Packt");
		
		bookService.addBook(headFirstJavaBook);
		bookService.addBook(headFirstDesignPatternBook);
		
		assertThrows(BookNotFoundException.class, 
				() -> bookService.getBookByTitle("Head First Spring"));
		
	}
	
	// TODO 1 assertThrowsWithMessage
	
	// TODO 2 assertThrowsWithMessageSupplier

}
