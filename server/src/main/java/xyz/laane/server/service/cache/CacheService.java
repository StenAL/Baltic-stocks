package xyz.laane.server.service.cache;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CacheService {

    @Scheduled(cron = "0 30 * * * *") // Every 30 minutes
    @CacheEvict("stocks")
    public void evictStocksCache() {
        log.info("Evicting stocks cache");
    }
}
