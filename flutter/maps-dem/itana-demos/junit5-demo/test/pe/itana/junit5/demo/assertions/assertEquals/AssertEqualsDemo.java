package pe.itana.junit5.demo.assertions.assertEquals;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.Test;

import pe.itana.junit5.demo.bookstore.model.Book;
import pe.itana.junit5.demo.bookstore.service.BookService;

public class AssertEqualsDemo {
	
	@Test
	public void assertEqualsWithNoMessage() {
		BookService bookService = new BookService();
		
		Book headFirstJavaBook = new Book("1", "Head First Java", "Wrox");
		Book headFirstDesignPatternBook = new Book("2", "Head First Design Pattern", "Packt");
		
		bookService.addBook(headFirstJavaBook);
		bookService.addBook(headFirstDesignPatternBook);
		
		Book actualBook = bookService.getBookById("1");
		
		assertEquals("1", actualBook.getBookId());
		assertEquals("Head First Java", actualBook.getTitle());
	}
	
	@Test
	public void assertEqualsWithMessage() {
		BookService bookService = new BookService();
		
		Book headFirstJavaBook = new Book("1", "Head First Java", "Wrox");
		Book headFirstDesignPatternBook = new Book("2", "Head First Design Pattern", "Packt");
		
		bookService.addBook(headFirstJavaBook);
		bookService.addBook(headFirstDesignPatternBook);
		
		Book actualBook = bookService.getBookById("1");
		
		assertEquals("1", actualBook.getBookId());
		assertEquals("Head First Java", actualBook.getTitle(), "Titulo del libro no coincide!");
	}
	
	@Test
	public void assertEqualsWithMessageSupplier() {
		BookService bookService = new BookService();
		
		Book headFirstJavaBook = new Book("1", "Head First Java", "Wrox");
		Book headFirstDesignPatternBook = new Book("2", "Head First Design Pattern", "Packt");
		
		bookService.addBook(headFirstJavaBook);
		bookService.addBook(headFirstDesignPatternBook);
		
		Book actualBook = bookService.getBookById("1");
		
		assertEquals("1", actualBook.getBookId());
		assertEquals("Head First Java", actualBook.getTitle(), () -> "Titulo del libro no coincide!");
	}

}
