package xyz.laane.server.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class KeyStats {
    @Id @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Double priceEarningTtm;
    private Double priceBook;
    private Double priceSalesTtm;
    private Double revenueGrowthThreeYearAvg;
    private Double epsGrowthThreeYearAvg;
    private Double operatingMarginTtm;
    private Double netMarginTtm;
    private Double roeTtm;
    private Double debtEquity;
}
