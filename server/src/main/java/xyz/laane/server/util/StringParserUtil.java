package xyz.laane.server.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

public class StringParserUtil {

    public static Optional<Integer> parseIntegerIfPresent(String value) {
        return value.equals("-") ? Optional.empty() : Optional.of(Integer.valueOf(standardizeNumber(value)));
    }

    public static Optional<Double> parseDoubleIfPresent(String value) {
        return value.equals("-") ? Optional.empty() : Optional.of(Double.valueOf(standardizeNumber(value)));
    }

    public static Optional<LocalDate> parseLocalDateIfPresent(String value, DateTimeFormatter formatter) {
        return value.equals("t.b.c.") ? Optional.empty() : Optional.of(LocalDate.parse(value, formatter));
    }

    private static String standardizeNumber(String number) {
        return number.replace(",", "");
    }
}
