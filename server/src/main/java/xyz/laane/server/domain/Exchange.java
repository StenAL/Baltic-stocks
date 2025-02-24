package xyz.laane.server.domain;

import java.util.Arrays;
import java.util.Set;
import lombok.Getter;

@Getter
public enum Exchange {
    TALLINN("EX$$$$XTAL", Set.of("EE")),
    RIGA("EX$$$$XRIS", Set.of("LV", "LU")),
    VILNIUS("EX$$$$XLIT", Set.of("LT"));

    private final String exchangeCode;
    private final Set<String> isinPrefixes;

    Exchange(String exchangeCode, Set<String> isinPrefixes) {
        this.exchangeCode = exchangeCode;
        this.isinPrefixes = isinPrefixes;
    }

    public static Exchange findByPrefix(String prefix) {
        return Arrays.stream(Exchange.values())
                .filter(exchange -> exchange.getIsinPrefixes().contains(prefix))
                .findFirst()
                .orElseThrow(() -> new IllegalArgumentException("No exchange found with prefix " + prefix));
    }
}
