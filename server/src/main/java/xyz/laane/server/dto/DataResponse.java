package xyz.laane.server.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import xyz.laane.server.domain.Index;
import xyz.laane.server.domain.Stock;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
public class DataResponse {
    private List<Stock> stocks;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm dd.MM.yyyy")
    private LocalDateTime timeFetched;
    private Index index;
}
