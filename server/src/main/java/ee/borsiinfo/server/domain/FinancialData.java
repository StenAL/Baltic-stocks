package ee.borsiinfo.server.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class FinancialData {
    @Id @JsonIgnore
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne(cascade = CascadeType.ALL)
    @ToString.Exclude @JsonIgnore
    private Stock stock;
    private int year;

    private Double revenue;
    private Double operatingIncome;
    private Double netIncome;
    private Double earningsPerShare;
    private Integer dilutedSharesOutstanding;

    private Double currentAssets;
    private Double nonCurrentAssets;
    private Double totalAssets;
    private Double currentLiabilities;
    private Double totalLiabilities;
    private Double totalEquity;

    private Double operatingCashFlow;
    private Double capitalExpenditure;
    private Double freeCashFlow;
}
