package pe.itana.junit5.demo.assertions.assertArraysEquals;

import static org.junit.Assert.assertArrayEquals;

import org.junit.jupiter.api.Test;

import pe.itana.junit5.demo.bookstore.model.Book;
import pe.itana.junit5.demo.bookstore.service.BookService;

public class AssertArraysEqualsDemo {
	
	@Test
	public void assertArrayEqualsWithNoMessage() {
		BookService bookService = new BookService();
		
		Book headFirstJavaBook = new Book("1", "Head First Java", "Wrox");
		Book headFirstDesignPatternBook = new Book("2", "Head First Design Pattern", "Packt");
		Book headFirstJavascriptBook = new Book("3", "Head First Javascript", "Wrox");
		
		bookService.addBook(headFirstJavaBook);
		bookService.addBook(headFirstDesignPatternBook);
		bookService.addBook(headFirstJavascriptBook);
		
		String[] actualBookIds = bookService.getBookIdsByPublisher("Wrox");
		
		assertArrayEquals(new String[] {"1", "3"}, actualBookIds);
	}
	
	// TODO 1 assertArrayEqualsWithMessage
	
	
	
	
	// TODO 2 assertArrayEqualsWithMessageSupplier

}
