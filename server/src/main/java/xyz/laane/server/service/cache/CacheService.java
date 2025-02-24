package xyz.laane.server.service.cache;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

@Service
public class CacheService {
    private final Logger log = LoggerFactory.getLogger(CacheService.class);

    @Scheduled(cron = "0 30 * * * *") // Every 30 minutes
    @CacheEvict("stocks")
    public void evictStocksCache() {
        log.info("Evicting stocks cache");
    }
}
