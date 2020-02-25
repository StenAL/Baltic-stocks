package ee.borsiinfo.server.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Data
@NoArgsConstructor
public class IndexDTO {
    private Long id;
    private IndexData data;

    @Data
    public static class IndexData {
        private LocalDate start;
        private LocalDate end;
        private List<Chart> charts;

        @Data
        public static class Chart {
            @JsonProperty("id")
            private String ticker;
            @JsonProperty("shortname")
            private String shortName;
            @JsonProperty("fullname")
            private String fullName;
            private double change;
        }
    }
}
