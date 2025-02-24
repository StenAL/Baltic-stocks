package xyz.laane.server.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import xyz.laane.server.domain.Index;
import xyz.laane.server.domain.Stock;

import java.time.LocalDateTime;
import java.util.List;

public record DataResponse(
        List<Stock> stocks,
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm dd.MM.yyyy")
        LocalDateTime timeFetched,
        Index index) {
}
