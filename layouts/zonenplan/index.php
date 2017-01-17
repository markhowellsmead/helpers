<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <title>Zonenplan für Libero</title>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
	<link rel="stylesheet" href="scss/svg.css">
</head>

<body>
    <div class="tx-frpzonemaplibero">

    	<div class="svg-holder">
    		<?php include 'map/zones_export.svg';?>
    	</div>

    	<div class="zoomies">
    		<button class="button button-in">+</button>
    		<button class="button button-out">-</button>
    	</div>

<!--         <img class="zones clickable" usemap="#LiberoZoneMap2017_Map" src="map/spacer.gif" width="1200" height="1064" />
        <map name="LiberoZoneMap2017_Map">
            <area shape="poly" alt="" data-type="libero" data-number="100" data-neighbours="101" coords="564,750,531,716,531,673,563,641,609,641,641,675,641,718,624,735,610,750">
            <area shape="poly" alt="" data-type="libero" data-number="101" data-neighbours="100,116,115,114,112,113" coords="539,805,475,741,476,651,539,587,631,587,695,651,694,744,630,806,587,805">
            <area shape="poly" alt="" data-type="libero" data-number="112" data-neighbours="101,699" coords="431,651,471,651,471,743,511,784,468,828,430,790,431,731,431,651">
            <area shape="poly" alt="" data-type="libero" data-number="113" data-neighbours="101,177" coords="457,647,430,647,430,607,485,553,554,553,554,583,537,583,472,647">
            <area shape="poly" alt="" data-type="libero" data-number="114" data-neighbours="101,124,151" coords="693,553,751,611,751,648,700,648,633,582,558,582,558,553,645,553,671,553">
            <area shape="poly" alt="" data-type="libero" data-number="115" data-neighbours="101,116,125" coords="685,812,658,785,699,746,700,652,752,652,751,734,751,791,709,836">
            <area shape="poly" alt="" data-type="libero" data-number="116" data-neighbours="126,101,115" coords="692,853,646,853,598,853,493,853,471,832,514,787,539,811,633,810,655,788,706,840">
            <area shape="poly" alt="" data-type="libero" data-number="124" data-neighbours="228,114,310" coords="693,525,693,548,609,549,488,549,531,506,604,506,694,506">
            <area shape="poly" alt="" data-type="libero" data-number="125" data-neighbours="115,130,146" coords="774,826,749,851,710,894,711,840,756,793,756,734,756,652,803,652,803,738,803,798">
            <area shape="poly" alt="" data-type="libero" data-number="126" data-neighbours="699,130,626,627,116" coords="696,905,637,905,561,905,469,905,398,905,468,834,492,858,612,858,693,858,706,846,705,898">
            <area shape="poly" alt="" data-type="libero" data-number="130" data-neighbours="146,125,126,626,131,147" coords="759,910,759,963,669,963,668,910,702,909,754,855,808,802,808,699,870,700,870,797,811,857,782,886">
            <area shape="poly" alt="" data-type="libero" data-number="131" data-neighbours="130" coords="763,936,763,913,809,864,873,801,905,834,906,913,856,915,809,962,763,963">
            <area shape="poly" alt="" data-type="libero" data-number="140" data-neighbours="144,145,141" coords="1033,706,1071,706,1072,769,1026,769,977,719,977,674,1009,706">
            <area shape="poly" alt="" data-type="libero" data-number="141" data-neighbours="140,156,142,147" coords="995,769,972,769,914,711,914,651,942,624,974,624,974,724,1020,769">
            <area shape="poly" alt="" data-type="libero" data-number="142" data-neighbours="141,143" coords="1015,914,976,914,976,856,976,774,1073,774,1073,803,1072,855,1047,882">
            <area shape="poly" alt="" data-type="libero" data-number="143" data-neighbours="142" coords="939,914,909,914,908,836,972,836,972,914">
            <area shape="poly" alt="" data-type="libero" data-number="144" data-neighbours="163,140" coords="1104,690,1094,702,1011,702,977,669,978,624,1051,624,1051,661,1113,661,1113,674,1112,682">
            <area shape="poly" alt="" data-type="libero" data-number="145" data-neighbours="161,446,140" coords="1112,797,1077,797,1077,706,1095,706,1112,689">
            <area shape="poly" alt="" data-type="libero" data-number="146" data-neighbours="156,147,130,125" coords="910,675,910,695,880,695,852,695,808,695,808,652,910,652">
            <area shape="poly" alt="" data-type="libero" data-number="147" data-neighbours="146,130,141" coords="910,716,972,775,972,832,908,832,874,797,873,700,910,700,910,716">
            <area shape="poly" alt="" data-type="libero" data-number="150" data-neighbours="152,155,153,151,228,154" coords="771,557,737,524,736,471,716,449,823,449,854,479,854,538,832,538,793,578">
            <area shape="poly" alt="" data-type="libero" data-number="151" data-neighbours="114,150" coords="756,648,755,608,697,549,697,525,731,525,803,598,803,648,780,648">
            <area shape="poly" alt="" data-type="libero" data-number="152" data-neighbours="150,217,196" coords="879,455,857,476,826,446,826,411,854,383,902,432">
            <area shape="poly" alt="" data-type="libero" data-number="153" data-neighbours="150,217" coords="822,429,822,444,714,445,714,411,822,411">
            <area shape="poly" alt="" data-type="libero" data-number="154" data-neighbours="150,156" coords="842,618,808,619,808,595,795,583,834,542,868,542,869,619">
            <area shape="poly" alt="" data-type="libero" data-number="155" data-neighbours="150,157" coords="857,512,857,481,905,434,939,469,868,538,858,538">
            <area shape="poly" alt="" data-type="libero" data-number="156" data-neighbours="146,157,154,141" coords="911,648,866,648,808,648,808,623,873,623,872,541,924,489,938,503,938,620">
            <area shape="poly" alt="" data-type="libero" data-number="157" data-neighbours="181,156,155,164" coords="978,437,1055,512,1164,512,1164,572,1052,572,1052,620,943,620,943,500,929,487,979,435">
            <area shape="poly" alt="" data-type="libero" data-number="161" data-neighbours="162,145" coords="1118,705,1118,662,1192,662,1193,683,1170,705">
            <area shape="poly" alt="" data-type="libero" data-number="162" data-neighbours="161" coords="1165,576,1117,624,1117,657,1193,657,1193,605">
            <area shape="poly" alt="" data-type="libero" data-number="163" data-neighbours="164,144" coords="1056,624,1056,657,1113,657,1113,624">
            <area shape="poly" alt="" data-type="libero" data-number="164" data-neighbours="157,163" coords="1056,576,1056,620,1115,620,1160,576">
            <area shape="poly" alt="" data-type="libero" data-number="177" data-neighbours="113,310,697" coords="459,573,426,606,427,647,400,647,375,647,375,589,347,561,354,552,430,552,480,552">
            <area shape="poly" alt="" data-type="libero" data-number="180" data-neighbours="181,194" coords="1073,470,1007,404,1118,404,1139,384,1178,423,1196,442,1195,470,1112,470">
            <area shape="poly" alt="" data-type="libero" data-number="181" data-neighbours="180,157" coords="1069,474,1163,474,1164,508,1055,508,980,434,980,405,1001,404,1044,447">
            <area shape="poly" alt="" data-type="libero" data-number="190" data-neighbours="193,191,192" coords="1097,280,1096,319,1008,320,958,269,1033,194,1097,258">
            <area shape="poly" alt="" data-type="libero" data-number="191" data-neighbours="194,190" coords="1101,327,1173,257,1173,204,1124,154,1035,154,1035,191,1079,234,1102,257">
            <area shape="poly" alt="" data-type="libero" data-number="192" data-neighbours="190,195,194" coords="980,298,1007,324,1096,323,1096,332,1031,399,980,399,980,298">
            <area shape="poly" alt="" data-type="libero" data-number="193" data-neighbours="279,190" coords="927,237,891,201,936,154,1029,153,1029,190,955,266">
            <area shape="poly" alt="" data-type="libero" data-number="194" data-neighbours="192,180,191,197" coords="1080,399,1037,399,1172,264,1171,297,1194,321,1118,399">
            <area shape="poly" alt="" data-type="libero" data-number="195" data-neighbours="216,192,196" coords="948,395,901,346,901,299,847,244,888,204,939,257,976,295,975,354,976,421">
            <area shape="poly" alt="" data-type="libero" data-number="196" data-neighbours="152,201,195" coords="958,451,943,467,882,406,817,339,765,339,816,287,816,247,844,247,896,299,896,348,977,430,969,440">
            <area shape="poly" alt="" data-type="depend" data-number="197" data-neighbours="194" coords="1142,381,1195,434,1195,327">
            <area shape="poly" alt="" data-type="libero" data-number="200" data-neighbours="201" coords="704,285,679,261,679,229,701,205,735,205,759,229,760,261,737,285,719,285">
            <area shape="poly" alt="" data-type="libero" data-number="201" data-neighbours="196,250,200,218,217,215,216,196" coords="725,152,681,152,627,207,626,251,674,251,675,228,701,201,737,201,763,228,763,264,738,288,702,288,675,262,674,251,626,251,626,281,681,338,759,338,811,284,811,206,756,152">
            <area shape="poly" alt="" data-type="libero" data-number="215" data-neighbours="201,279,345" coords="590,172,615,172,689,98,705,115,747,115,747,148,679,148,623,205,622,221,564,222,564,172">
            <area shape="poly" alt="" data-type="libero" data-number="216" data-neighbours="201,279,195" coords="831,242,816,242,814,204,759,149,751,149,751,115,798,115,885,201,843,242">
            <area shape="poly" alt="" data-type="libero" data-number="217" data-neighbours="152,153,218,201" coords="830,358,851,379,822,406,714,406,714,340,812,341">
            <area shape="poly" alt="" data-type="libero" data-number="218" data-neighbours="217,201,228" coords="640,383,680,342,710,342,710,417,606,417">
            <area shape="poly" alt="" data-type="libero" data-number="228" data-neighbours="218,150,229,124,310" coords="710,433,711,448,730,469,731,522,698,522,697,501,615,500,533,500,532,421,636,421,710,421">
            <area shape="poly" alt="" data-type="libero" data-number="229" data-neighbours="228,250,311" coords="554,340,589,375,589,417,532,417,532,408,497,368,540,325">
            <area shape="poly" alt="" data-type="libero" data-number="250" data-neighbours="201,251,331" coords="653,364,600,417,592,417,592,372,548,327,489,268,532,225,622,225,622,285,677,339">
            <area shape="poly" alt="" data-type="libero" data-number="251" data-neighbours="334,250,252" coords="479,259,473,253,536,191,535,158,559,158,559,221,531,221,485,265">
            <area shape="poly" alt="" data-type="libero" data-number="252" data-neighbours="251,253" coords="464,243,454,234,438,235,481,192,528,192,471,250">
            <area shape="poly" alt="" data-type="libero" data-number="253" data-neighbours="252" coords="532,174,532,189,481,189,481,157,532,157,532,166">
            <area shape="poly" alt="" data-type="depend" data-number="279" data-neighbours="193,280,216,215" coords="900,118,933,151,887,198,801,111,707,111,634,38,722,38,756,5,806,5,806,102,884,102">
            <area shape="poly" alt="" data-type="depend" data-number="280" data-neighbours="279,281,282" coords="810,53,883,53,935,54,934,146,884,97,810,97,810,53">
            <area shape="poly" alt="" data-type="depend" data-number="281" data-neighbours="280" coords="998,148,938,148,939,53,987,4,1090,4,1123,39,1123,76,1092,106,1042,106,1030,118,1030,148">
            <area shape="poly" alt="" data-type="depend" data-number="282" data-neighbours="280" coords="809,5,911,5,980,5,934,49,876,49,809,49,809,5">
            <area shape="poly" alt="" data-type="libero" data-number="300" data-neighbours="301" coords="352,410,330,387,330,354,354,331,387,331,410,356,410,388,386,410,369,410">
            <area shape="poly" alt="" data-type="libero" data-number="301" data-neighbours="300,315,321,331,311,312" coords="369,416,388,416,414,390,414,353,388,327,353,327,326,353,327,390,345,409,314,436,285,404,286,336,335,287,404,287,455,339,454,407,404,456,335,456,314,436,344,409,353,416">
            <area shape="poly" alt="" data-type="libero" data-number="310" data-neighbours="311,228,124,177,312" coords="458,549,407,549,357,549,405,501,444,501,522,421,529,421,529,503,483,549">
            <area shape="poly" alt="" data-type="libero" data-number="311" data-neighbours="310,301,229" coords="441,497,406,497,368,459,407,460,458,408,494,371,528,407,528,417,520,417,484,453">
            <area shape="poly" alt="" data-type="libero" data-number="312" data-neighbours="301,313,310" coords="402,498,343,556,276,490,310,457,309,437,333,459,363,459">
            <area shape="poly" alt="" data-type="libero" data-number="313" data-neighbours="312,314,696" coords="339,560,313,587,218,587,200,605,201,648,145,649,135,638,135,606,201,540,216,526,248,520,274,492">
            <area shape="poly" alt="" data-type="libero" data-number="314" data-neighbours="313,315" coords="136,395,188,345,187,451,216,483,234,502,186,550,135,599,136,516,136,395">
            <area shape="poly" alt="" data-type="libero" data-number="315" data-neighbours="314,301" coords="206,466,192,452,192,341,247,287,329,287,283,334,282,405,288,413,219,481">
            <area shape="poly" alt="" data-type="libero" data-number="321" data-neighbours="301,322,341" coords="404,238,403,282,321,282,247,283,248,238,340,238,378,238">
            <area shape="poly" alt="" data-type="libero" data-number="322" data-neighbours="321,323" coords="168,314,133,280,175,238,243,238,243,283,190,337">
            <area shape="poly" alt="" data-type="depend" data-number="323" data-neighbours="322,324,325" coords="171,356,133,392,78,336,131,283,187,340">
            <area shape="poly" alt="" data-type="depend" data-number="324" data-neighbours="323" coords="98,363,132,397,132,406,82,406,7,406,75,338">
            <area shape="poly" alt="" data-type="libero" data-number="325" data-neighbours="323,351" coords="3,404,3,292,31,265,142,266,72,336,33,374">
            <area shape="poly" alt="" data-type="libero" data-number="331" data-neighbours="301,250" coords="523,335,458,402,459,337,408,283,408,238,452,238,537,323">
            <area shape="poly" alt="" data-type="libero" data-number="341" data-neighbours="342,321,353,352,351" coords="314,235,248,234,248,187,279,155,314,155,314,197">
            <area shape="poly" alt="" data-type="libero" data-number="342" data-neighbours="341,343" coords="369,235,318,235,318,155,374,155,404,187,404,235">
            <area shape="poly" alt="" data-type="libero" data-number="343" data-neighbours="342,344" coords="438,38,438,114,478,157,478,191,435,235,409,235,409,185,377,153,377,38,416,38">
            <area shape="poly" alt="" data-type="libero" data-number="344" data-neighbours="343,345,251" coords="622,38,595,67,559,103,560,154,478,152,441,114,441,38,550,38,594,38">
            <area shape="poly" alt="" data-type="libero" data-number="345" data-neighbours="344,215" coords="563,104,628,38,685,95,616,166,563,167,563,104">
            <area shape="poly" alt="" data-type="depend" data-number="351" data-neighbours="325,341,352" coords="243,211,243,234,172,236,147,261,35,261,60,237,82,214,82,186,105,186,189,187,217,187,243,187" title="351">
            <area shape="poly" alt="" data-type="depend" data-number="352" data-neighbours="351,353,341" coords="245,183,159,182,84,183,144,123,229,38,276,38,276,101,277,154,259,169">
            <area shape="poly" alt="" data-type="libero" data-number="353" data-neighbours="343,352,341" coords="372,152,279,152,279,38,372,38,372,96">
            <area shape="poly" alt="" data-type="depend" data-number="446" data-neighbours="145,447" coords="1169,797,1118,797,1118,710,1169,710">
            <area shape="poly" alt="" data-type="depend" data-number="447" data-neighbours="446" coords="1077,854,1168,854,1168,801,1078,801">
            <area shape="poly" alt="" data-type="libero" data-number="626" data-neighbours="126,130,628" coords="665,910,665,963,534,963,534,910">
            <area shape="poly" alt="" data-type="libero" data-number="627" data-neighbours="126,628" coords="530,930,530,963,452,963,339,962,392,910,530,910">
            <area shape="poly" alt="" data-type="libero" data-number="628" data-neighbours="627,626" coords="542,1045,621,1045,659,1007,658,967,337,968,336,1027,371,1061,525,1061">
            <area shape="poly" alt="" data-type="libero" data-number="696" data-neighbours="697,313" coords="287,611,254,646,204,647,204,608,203,608,221,590,309,590">
            <area shape="poly" alt="" data-type="depend" data-number="697" data-neighbours="696,698,177" coords="354,625,291,688,255,650,287,617,342,562,371,590,372,608">
            <area shape="poly" alt="" data-type="libero" data-number="698" data-neighbours="699,697" coords="350,745,321,717,294,692,372,613,371,661,371,747,371,769">
            <area shape="poly" alt="" data-type="libero" data-number="699" data-neighbours="126,112,698" coords="382,895,376,890,375,789,375,651,427,651,427,732,428,792,465,831,392,905">
        </map> -->
    </div>


    <script src="jquery.rwdImageMaps.min.js"></script>
    <script src="init.js"></script>

</body>

</html>
