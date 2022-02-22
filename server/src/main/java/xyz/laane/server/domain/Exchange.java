package xyz.laane.server.domain;

import lombok.Getter;

import java.util.Arrays;

@Getter
public enum Exchange {
    TALLINN("EX$$$$XTAL", "EE"),
    RIGA("EX$$$$XRIS", "LV"),
    VILNIUS("EX$$$$XLIT", "LT");

    private final String exchangeCode;
    private final String isinPrefix;
    Exchange(String exchangeCode, String isinPrefix) {
        this.exchangeCode = exchangeCode;
        this.isinPrefix = isinPrefix;
    }

    public static Exchange findByPrefix(String prefix) {
        return Arrays.stream(Exchange.values())
            .filter(exchange -> exchange.getIsinPrefix().equals(prefix))
            .findFirst()
            .orElseThrow(() -> new IllegalArgumentException("No exchange found with prefix " + prefix));
    }
}
