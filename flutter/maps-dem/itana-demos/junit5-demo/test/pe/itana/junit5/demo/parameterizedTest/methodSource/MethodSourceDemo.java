package pe.itana.junit5.demo.parameterizedTest.methodSource;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;

import java.util.stream.Stream;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;

import pe.itana.junit5.demo.utils.StringHelper;

public class MethodSourceDemo {

	@ParameterizedTest
	@MethodSource("stringProvider")
	public void methodSourceTest(String value) {
		assertNotNull(value);
	}
	
	public static Stream<String> stringProvider() {
		return Stream.of("dog", "cat", "mouse");
	}
	
	@ParameterizedTest
	@MethodSource("argumentsProvider")
	public void methodSourceTestWithArguments(String input, String expected) {
		StringHelper stringHelper = new StringHelper();
		assertEquals(expected, stringHelper.reverse(input));
	}
	
	public static Stream<Arguments> argumentsProvider() {
		return Stream.of(
				Arguments.arguments("car", "rac"),
				Arguments.arguments("mom", "mom")
		);
	}
	
}