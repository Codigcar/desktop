package pe.itana.junit5.demo.assertions.assertTimeout;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTimeout;

import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;

import pe.itana.junit5.demo.bookstore.model.Book;
import pe.itana.junit5.demo.bookstore.service.BookService;

public class AssertTimeoutDemo {
	
	@Test
	public void assertTimeoutWithNoMessage() {
		BookService bookService = new BookService();
		
		for(int i = 1; i <= 10000; i++) {
			bookService.addBook(new Book(String.valueOf(i), "Head First Java", "Wrox"));
		}
		
		List<String> actualTitles = new ArrayList<>();
		
		assertTimeout(Duration.ofMillis(1), () -> {
			actualTitles.addAll(bookService.getBookTitlesByPublisher("Wrox"));
		});
		
		assertEquals(10000, actualTitles.size());
		
	}
	
	// TODO 1 assertTimeoutWithMessage
	
	
	// TODO 2 assertTimeoutWithMessageSupplier

}
