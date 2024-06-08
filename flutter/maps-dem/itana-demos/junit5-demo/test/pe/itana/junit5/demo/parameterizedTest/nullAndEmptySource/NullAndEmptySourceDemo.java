package pe.itana.junit5.demo.parameterizedTest.nullAndEmptySource;

import static org.junit.jupiter.api.Assertions.assertEquals;

import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EmptySource;
import org.junit.jupiter.params.provider.NullAndEmptySource;
import org.junit.jupiter.params.provider.NullSource;

import pe.itana.junit5.demo.utils.StringHelper;

public class NullAndEmptySourceDemo {

	@ParameterizedTest
	@NullSource
	public void testReverseWithNullSource(String input) {
		StringHelper stringHelper = new StringHelper();
		assertEquals(null, stringHelper.reverse(input));
	}
	
	@ParameterizedTest
	@EmptySource
	public void testReverseWithEmptySource(String input) {
		StringHelper stringHelper = new StringHelper();
		assertEquals("", stringHelper.reverse(input));
	}
	
	@ParameterizedTest
	@NullAndEmptySource
	public void testReverseWithNullAndEmptySource(String input) {
		StringHelper stringHelper = new StringHelper();
		assertEquals(input, stringHelper.reverse(input));
	}
}