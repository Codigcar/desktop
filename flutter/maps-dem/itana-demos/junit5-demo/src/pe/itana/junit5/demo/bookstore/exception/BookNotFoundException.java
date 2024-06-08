package pe.itana.junit5.demo.bookstore.exception;

public class BookNotFoundException extends RuntimeException {
	public BookNotFoundException(String message) {
		super(message);
	}
}