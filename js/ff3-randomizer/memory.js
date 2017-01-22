'use strict';

var FF3 = (function(window, $, module, undefined) {
    
    
    // Define addresses
    module.address = {
		equipabilitySets: 0x910,
        palettesOverworld: 0x16A0,
        spritesOverworld: 0x1C010,
        paletteIndexBattle: 0x5DE5A,
        spritesBattle: 0x50010,
        paletteIndexMenu: 0x782E8,
		jobCommands: 0x69B31,
		jobBaseData: 0x72010,
		jobGrowth: 0x721E6,
		jobNamePtr: 0x303D4,
		MPGrowthTable: 0x73D98,
		expTable: 0x720C0,
		statLevelUp: 0x721E6,
		initialHP: 0x73BE8,
		initialEquipment: 0x73C00,
		encounterSettings: 0x5C010,
		encounterLists: 0x5C410,
		encounterStructures: 0x5CA10,
        encountersByArea: 0x5D300,
		dropsStealsData: 0x21B90,
		monsterCombatData: 0x60010,
        monsterStats: 0x61010,
		monsterExpValues: 0x21D90,
		monsterGoldValues: 0x61C68,
        weaponGFX: 0x5D0A8,
		formCPValues: 0x732BE,
		specialAttackTable: 0x61210,
		prices: 0x21E10,
		shopItems: 0x5A080,
		chestsData: 0x3C10,
		moveSpeed: 0x7CDE8,
        moveSpeed2: 0x7b747,
        moveSpeed3: 0x7b775,
        jobCover: 0x6A152,
		runaway: 0x6A936,
        skillPointsPerLevel: 0x6BE20,
        jobData1: 0x73B2A,
        stepTable: 0x7FE10,
		numOfCrystalJobs: [
			0x7F3A5,	// LandTurtl Crystal
			0x7F3AA,	// Salamandr Crystal
			0x7F3AF,	// Kraken Crystal
			0x7F3B4,	// Titan Crystal
		],
        shops: {
            weapon: [0x5a096, 0x59cd4, 0x5a09d, 0x59cdb, 0x5a0a4, 0x59ce0, 0x5a0a8, 0x5a0ac, 0x59cf1, 0x5a0b5, 0x59cfa, 0x5a0be],
            armor: [0x5a0c3, 0x59d06, 0x5a0cc, 0x59d0d, 0x5a0d3, 0x59d14, 0x5a0d9, 0x59d1b, 0x5a0e1, 0x59d24, 0x5a0ea],
            item: [0x59cba, 0x5a07f, 0x59cbf, 0x5a088, 0x59cc8, 0x5a091, 0x59cd1, 0x59d03, 0x5a116, 0x59d54, 0x59d57],
            magic: [0x59ce9, 0x59d2b, 0x5a0ee, 0x59d2e, 0x5a0f5, 0x59d33, 0x5a0fd, 0x59d39, 0x5a105, 0x59d42, 0x5a10d, 0x59d4b, 0x5a11d, 0x5a125, 0x59d5c, 0x5a12a]
        },
        owTextboxPalette: 0x75140,
        menuTextboxPalette: 0x7e1cc,
        battleTextboxPalette: 0x5cf00
    };
    
    module.bad_items = [
		0x00, // Nothing
		0x57, // Separator between weapons and armor
		0x9A, 0x9C, // Horn, Time Gear
		0x9E, 0x9F, 0xA0, 0xA1, // Fangs
		0xA5 // used for gold chests
	];
	
	module.excluded_items = {
        key: [
            0x9B, // Eye
            0x9D, // Eureka Key
            0xA2, // Lute
            0xA3, // Sylx Key
            0xF6, // Toad
            0xF7  // Mini
        ],
        ultimate: [
            0x36, // Excalibur
            0x37, // Masamune
            0x38, // Ragnarok
            0x40  // Full Moon
        ],
        onion: [
            0x39, // Onion Sword
            0x59, // Onion Shield
            0x63, // Onion Helmet
            0x74, // Onion Armor
            0x8C  // Onion Gloves
        ],
        magic: [
            0xC8, // Flare
            0xC9, // Death
            0xCA, // Meteo
            0xCB, // WWind
            0xCC, // Life2
            0xCD, // Holy
            0xCE  // Bahamut
	   ]
    };
    
    module.eureka_shops = [0x5a116, 0x5a11d, 0x5a125];
    
    module.weapon_sprites = [
        0x53, 0x5B, 0x63, 0x66, 0x6B, 0x70, 0x78, 0x80, 0x88, 0x90, 0x98, 0xA0, 0xA8, 0xB0,
        0xB8, 0xC0, 0xC8, 0xD0, 0xD8, 0xE0, 0xE8, 0xEC, 0xEE, 0xF0, 0xF2, 0xF4, 0xF6, 0xF8
    ];
    
    module.weapon_palettes = [
        0xB1, 0xB9, 0xBA, 0xBB, 0xBC, 0xBD, 0xBE, 0xC1, 0xC2, 0xC3, 0xC4, 0xC7, 0xC9, 0xCA,
        0xCE, 0xCF, 0xD3, 0xD4, 0xD8, 0xDB, 0xE3, 0xE5, 0xE7, 0xE8, 0xE9, 0xEA, 0xEB, 0xEC,
        0xF0, 0xF1, 0xF3, 0xF5, 0xF7
    ];
    
    module.encounter_lists = [
        [
            0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0F,
            0x10, 0x11, 0x12, 0x16, 0x17, 0x18, 0x19, 0x1A, 0x1B, 0x1C, 0x1D, 0x1E, 0x1F,
            0x20, 0x23, 0x24, 0x25, 0x28, 0x29, 0x2A, 0x2B,
            0x31, 0x43, 0x44, 0x45, 0x48, 0x49, 0x4A
        ],
        [
            0x00, 0x5B, 0x6B, 0x6c, 0x6d, 0x6e,
            0x70, 0x71, 0x72, 0x73, 0x74, 0x75, 0x77, 0x78, 0x79, 0x7a, 0x7b, 0x7c, 0x7d,
            0x83, 0x84, 0x85, 0x86, 0x87, 0x89, 0x8a, 0x8b, 0x8c, 0x8d, 0x8e, 0x8f,
            0x90, 0x91, 0x92, 0x93, 0x94, 0x95, 0x96, 0x97, 0x98, 0x9a, 0x9b, 0x9c, 0x9d, 0x9f,
            0xa0, 0xa1, 0xa2, 0xa3, 0xa4, 0xa5, 0xa6, 0xa7, 0xa8, 0xa9, 0xaa, 0xab, 0xac, 0xad,
            0xb1, 0xb2, 0xb3, 0xb4, 0xb5, 0xb6
        ]
    ];
    
    module.monster_on_hit = [
        0x02, 0x03, 0x04, 0x10, 0x21, 0x31, 0x40, 0x41, 0x80, 0x81, 0x91
    ];
      
    return module;
})(window, jQuery, FF3 || {});