package ee.borsiinfo.server.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import ee.borsiinfo.server.domain.Stock;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class StockResponse {
    private List<Stock> stocks;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm dd.MM.yyyy")
    private LocalDateTime timeFetched;
}
