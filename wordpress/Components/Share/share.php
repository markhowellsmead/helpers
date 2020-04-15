<div class="c-share c-share--single">
  <ul class="c-share__entries">
    <li class="c-share__entry">
      <a target="_blank" rel="nofollow" class="c-share__entrylink" data-shareto="facebook" href="https://www.facebook.com/sharer/sharer.php?u=<?php echo urlencode(get_permalink());?>">
        <span class="c-share__entryicon"><?php include get_template_directory().'/partials/svg/share-facebook.svg';?></span>
        <span class="c-share__entrytext"><?php _ex('Auf Facebook teilen', 'Share link text', 'sht');?></span>
      </a>
    </li>
    <li class="c-share__entry">
      <a target="_blank" rel="nofollow" class="c-share__entrylink" data-shareto="twitter" href="http://twitter.com/share?url=<?php echo urlencode(wp_get_shortlink());?>&text=<?php echo urlencode(get_the_title());?>">
        <span class="c-share__entryicon"><?php include get_template_directory().'/partials/svg/share-twitter.svg';?></span>
        <span class="c-share__entrytext"><?php _ex('Auf Twitter teilen', 'Share link text', 'sht');?></span>
      </a>
    </li>
    <li class="c-share__entry">
      <a target="_blank" rel="nofollow" class="c-share__entrylink" data-shareto="linkedin" href="https://www.linkedin.com/shareArticle?mini=true&url=<?php echo urlencode('https://www.agrarforschungschweiz.ch/aktuelles_heft_10de.php?id_artikel=2451');?>&title=<?php echo urlencode(get_the_title());?>">
        <span class="c-share__entryicon"><?php include get_template_directory().'/partials/svg/share-linkedin.svg';?></span>
        <span class="c-share__entrytext"><?php _ex('Auf Linkedin teilen', 'Share link text', 'sht');?></span>
      </a>
    </li>
    <li class="c-share__entry">
      <a target="_blank" class="c-share__entrylink" href="mailto:?subject=<?php echo urlencode(get_the_title());?>&body=<?php echo urlencode(get_the_excerpt().chr(10).chr(10).get_permalink());?>">
        <span class="c-share__entryicon"><?php include get_template_directory().'/partials/svg/share-email.svg';?></span>
        <span class="c-share__entrytext"><?php _ex('Via E-Mail teilen', 'Share link text', 'sht');?></span>
      </a>
    </li>
			<li class="c-share__entry">
      <a target="_blank" class="c-share__entrylink" href="whatsapp://send?text=<?php echo urlencode(sprintf('%1$s%2$s%2$s%3$s'), get_the_excerpt(), chr(10), get_permalink());?>">
        <span class="c-share__entryicon"><?php include get_template_directory().'/partials/svg/share-whatsapp.svg';?></span>
        <span class="c-share__entrytext"><?php _ex('Via WhatsApp teilen', 'Share link text', 'sht');?></span>
      </a>
    </li>
  </ul>
</div>
