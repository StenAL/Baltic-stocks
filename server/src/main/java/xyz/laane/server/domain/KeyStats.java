package xyz.laane.server.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

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
