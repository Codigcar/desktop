package pe.itana.junit5.demo.displayName;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

@DisplayName("A special test case")
public class DisplayNameDemo {

	@Test
	@DisplayName("Custom test name containing spaces")
	public void displayNameDemoTest() {
		assertEquals(3, 2 + 1);
	}
	
	@Test
	@DisplayName("DisplayName demo with ╯°□°）╯ special characters")
	public void displayNameDemoWithSpecialCharacters() {
		assertEquals(3, 2 + 1);
	}
	
	@Test
	@DisplayName("DisplayName demo with emojis 😱")
	public void displayNameDemoWithEmojis() {
		assertEquals(3, 2 + 1);
	}
}