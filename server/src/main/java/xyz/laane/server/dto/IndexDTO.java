package xyz.laane.server.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

public record IndexDTO(
        IndexData data,
        String status
) {
    public record IndexData(
            LocalDate start,
            LocalDate end,
            @JsonProperty("start_local")
            String startLocal,
            @JsonProperty("end_local")
            String endLocal,
            @JsonProperty("chart_type")
            String chartType,
            @JsonProperty("download_url")
            String downloadUrl,
            List<Chart> charts
    ) {
    }

    public record Chart(
            @JsonProperty("id")
            String ticker,
            @JsonProperty("shortname")
            String shortName,
            @JsonProperty("fullname")
            String fullName,

            @JsonProperty("first_value")
            double firstValue,
            @JsonProperty("last_value")
            double lastValue,

            @JsonProperty("change")
            double changePercent,

            LocalDate start,
            LocalDate end,
            @JsonProperty("start_local")
            String startLocal,
            @JsonProperty("end_local")
            String endLocal,
            @JsonProperty("chart_type")
            String chartType,
            String type,
            int decimals
    ) {
    }

}


