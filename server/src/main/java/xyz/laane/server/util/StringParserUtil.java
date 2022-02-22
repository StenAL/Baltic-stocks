package xyz.laane.server.util;

import lombok.experimental.UtilityClass;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Optional;

@UtilityClass
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

    private String standardizeNumber(String number) {
        return number.replace(",", "");
    }
}
