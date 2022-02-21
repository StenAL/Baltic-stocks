package ee.borsiinfo.server.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
public class IndexDTO {
    private IndexData data;
    private String status;

    @Data
    public static class IndexData {
        private LocalDate start;
        private LocalDate end;
        @JsonProperty("start_local")
        private String startLocal;
        @JsonProperty("end_local")
        private String endLocal;
        @JsonProperty("chart_type")
        private String chartType;
        @JsonProperty("download_url")
        private String downloadUrl;

        private List<Chart> charts;

        @Data
        public static class Chart {
            @JsonProperty("id")
            private String ticker;
            @JsonProperty("shortname")
            private String shortName;
            @JsonProperty("fullname")
            private String fullName;

            @JsonProperty("first_value")
            private double firstValue;
            @JsonProperty("last_value")
            private double lastValue;

            @JsonProperty("change")
            private double changePercent;

            private LocalDate start;
            private LocalDate end;
            @JsonProperty("start_local")
            private String startLocal;
            @JsonProperty("end_local")
            private String endLocal;
            @JsonProperty("chart_type")
            private String chartType;
            private String type;
            private int decimals;
        }
    }
}
